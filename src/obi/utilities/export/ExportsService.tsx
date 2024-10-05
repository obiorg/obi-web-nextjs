
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


require('jspdf');
require('jspdf-autotable');
//import
import * as XLSX from "xlsx";

interface ExportResultProps {
    type?: string, // CSV, EXCEL, PDF
    processing?: boolean, //
    result?: any, //
}

export const ExportsService = {


    /**
     * Convert a JSON to a CSV String text
     * 
     * @param jsonArray JSON array to be converted to CSV. Sub json will be converted as objects !
     * @returns string representation of the JSON array
     */
    JSONToCSV(jsonArray: any) {
        const array = typeof jsonArray !== 'object' ? JSON.parse(jsonArray) : jsonArray;
        let str = '';

        // Prepare header
        if (array.length > 0) {
            let header = '';
            let keys = Object.keys(array[0]);
            for (let i = 0; i < keys.length; i++) {
                if (header !== '') header += ',';
                header += keys[i];
            }
            str += header + '\r\n';
        }

        // Prepare lines
        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in array[i]) {
                if (line !== '') line += ',';

                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    },


    /**
     * Allow to download file as csv containing data as JSON format
     * 
     * @param data JSON array data to be parsed
     * @param fileName Name of the file to be created without extension
     */
    downloadAsCSV(data: any, fileName: any) {
        const csvData = new Blob([this.JSONToCSV(data)], { type: 'text/csv' });
        const csvURL = URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = csvURL;
        link.download = `${fileName}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    },

    /**
     * Convert a JSON array to a 2D array
     * 
     * @param json JSON array to be converted to 2D array
     * @returns 2D array representation of the JSON array
     */
    JSONToArray(json: any[]): any[] {
        var result: any = [];
        json.forEach(function (row) {
            let newRow: any = [];
            let rowkey = Object.keys(row);
            rowkey.forEach(function (key) {
                newRow.push(typeof (row[key]) !== 'string' ? "" + row[key] + "" : row[key]);
            });
            result.push(newRow);
        })
        return result;
    },

    /**
     * Allow to download file as pdf containing data as JSON format
     * 
     * @param columns columns header name ex: const exportColumns = columns.map(col => ({ title: col.header, dataKey: col.field }));
     * @param data JSON array as [{first row},{second row},{... row}...]
     * @param fileName name of the file do not forget to put .pdf extension
     */
    downloadAsPdf(columns: any, data: any, fileName?: string, columnsStyles?: any): void {
        // Prépare the page
        const doc = new jsPDF({
            orientation: "landscape",
            // unit: "in",
            // format: [4, 2]
        });
        doc.setProperties({
            title: fileName,
            subject: 'Display content of table',
            author: 'Author Name',
            keywords: 'generated, javascript, web 2.0, ajax',
            creator: 'Creator Name'
        });
        var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
        for (let i = 0; i < pageCount; i++) {
            doc.setPage(i);
            let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
            doc.setFontSize(12);
            doc.text('page: ' + pageCurrent + '/' + pageCount, 10, doc.internal.pageSize.height - 10);
        }


        autoTable(doc, {
            // styles: { fillColor: [255, 0, 0] },
            columnStyles: columnsStyles, // Cells in first column centered and green
            margin: { top: 10 },
            head: [columns],
            body: this.JSONToArray(data),
            theme: 'grid',
            showFoot: 'everyPage'
        })

        // Save produce document
        doc.save(fileName || "locations_" + Math.floor(Date.now() / 1000) + '.pdf');
    },


    /**
     * Allow to download file as Excel containing data as JSON format
     * 
     * @param data JSON array as [{first row},{second row},{... row}...]
     * @param fileName Name of the file to be created without extension
     */
    downloadAsXLSX(data: any, fileName: any) {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "obi1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, fileName + ".xlsx");
    },

    toCapitalize(s: string): any {
        return s.charAt(0).toUpperCase() + s.slice(1);
    },

    importCSVOld(e: any) {
        const csv = e.target?.result;
        const data = csv?.split('\n');

        // Prepare DataTable
        const cols = data[0].replace(/['"]+/g, '').split(',');
        data.shift();

        let _importedCols = cols.map((col: any) => ({ field: col, header: this.toCapitalize(col.replace(/['"]+/g, '')) }));
        let _importedData = data.map((d: any) => {
            d = d.split(',');
            return cols.reduce((obj: any, c: any, i: any) => {
                obj[c] = d[i].replace(/['"]+/g, '');
                return obj;
            }, {});
        });

        return { importedCols: _importedCols, importedData: _importedData };
    },

    importCSV(e: any): any {
        const file = e.files[0];
        const reader = new FileReader();
        let imported: any;
        reader.onload = (e) => {
            imported = this.importCSVOld(e);
        };
        reader.readAsText(file, 'UTF-8');
        return imported;
    },

    importExcel(e: any): any {
        const file = e.files[0];
        let table;
        import('xlsx').then(xlsx => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const wb = xlsx.read(e.target?.result, { type: 'array' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

                // Prepare DataTable
                const cols: any = data[0];
                data.shift();

                let _importedCols = cols.map((col: any) => ({ field: col, header: this.toCapitalize(col) }));
                let _importedData = data.map((d: any) => {
                    return cols.reduce((obj: any, c: any, i: any) => {
                        obj[c] = d[i];
                        return obj;
                    }, {});
                });

                table = { importedCols: _importedCols, importedData: _importedData };
            };

            reader.readAsArrayBuffer(file);
        });
        return table;
    },



    exportToCSV(Service: any, lazyParams: any, name: string): any {
        let res = { type: 'CSV', processing: true, result: null };

        let loadLazyTimeout = 0;
        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            Service.download(lazyEventSet).then((data: any) => {
                this.downloadAsCSV(data, name + '_' + Math.floor(Date.now() / 1000))
                res.processing = false
                res.result = data;
                return res;
            });
        }, Math.random() * 1000 + 500) as unknown as number;
    },

    exportToExcel(Service: any, lazyParams: any, name: string): any {
        let res = { type: 'EXCEL', processing: true, result: null };

        let loadLazyTimeout = 0;
        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }
        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            Service.download(lazyEventSet).then((data: any) => {
                this.downloadAsXLSX(data, name + '_' + Math.floor(Date.now() / 1000))
                res.processing = false
                res.result = data;
                return res;
            });
        }, Math.random() * 1000 + 500) as unknown as number;
    },

    exportToPDF(Service: any, lazyParams: any, name: string, columns: any, columnsStyle: any): any {
        let res = { type: 'PDF', processing: true, result: null };

        let loadLazyTimeout = 0;
        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            Service.download(lazyEventSet).then((data: any) => {
                const exportColumns = columns.map((col: any) => ({ title: col.header, dataKey: col.field }));
                this.downloadAsPdf(exportColumns, data, name + ' ' + Math.floor(Date.now() / 1000) + '.pdf', columnsStyle);
                res.processing = false
                res.result = data;
                return res;
            });
        }, Math.random() * 1000 + 500) as unknown as number;
    },
};
