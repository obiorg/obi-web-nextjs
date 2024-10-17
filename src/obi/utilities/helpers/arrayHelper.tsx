


export const ArrayHelper = {


  /**
   * 
   * @param arr array of object to modify by adding new item
   * @param index index position of new item starting array on index zero
   * @param item object to insert in the array at index position
   * @returns new array with item insereted at define index or arr if index is out of boundary
   */
  insertItemAtIndex(arr: any[], index: number, item: any): any[] {
    if (index < 0 || index > arr.length) {
      // Index out of bounds, 
      // return the original array
      console.error('Index out of bounds'); 
      return arr;
    }

    return arr.slice(0, index)
      .concat(item, arr.slice(index));
  }


};
