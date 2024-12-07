// src/components/post-form.tsx

// this is a client component
'use client'

import Link from "next/link"
import { useFormState } from "react-dom"
import { EntitiesModel } from "@/src/obi/models/businesses/EntitiesModel"
import { Toast } from "primereact/toast"
import { useRef, useState } from "react"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

import { OBI } from "@/src/types"
import { Checkbox } from "primereact/checkbox"
import { InputNumber } from "primereact/inputnumber"
import { Dropdown } from "primereact/dropdown"
import { Skeleton } from "primereact/skeleton"
import DropDownLocations from "../../../connexions/drivers/components/dropdown"

const model = new EntitiesModel();




// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function PostForm({ formAction, type, initialData }: OBI.EntitiesPostFormProps) {
    // Initialize the form state and action
    const [formState, action] = useFormState<OBI.EntitiesFormState>(formAction, {
        errors: {},
    })

    // Used for toast
    const toast = useRef<Toast>(null);

    // Used for dialog
    const [showMessage, setShowMessage] = useState(false);
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;


    


    return <>

        <div className="card">

            {/** Message toaster display */}
            <Toast ref={toast} />


            {/** Display Dialog box  */}
            <Dialog visible={showMessage}
                onHide={() => setShowMessage(false)}
                position="center"
                footer={dialogFooter} showHeader={true} header={(<h3>Confirmation</h3>)} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-0 px-3">
                    <h5 className='vertical-align-middle'>
                        <i className="pi pi-check-circle mr-4 vertical-align-middle"
                            style={{ fontSize: '3rem', color: 'var(--green-500)' }}></i>
                        Création entité - réussie !
                    </h5>

                    <p className='mt-3'>
                        Entité  &quot;<b>{initialData.entity}</b>&quot; créée avec succès : <br />
                    </p>
                    {/* <ul>
                        <li>IP      &emsp;&emsp;: <b>{entity.address}</b></li>
                        <li>Rack    &emsp;&emsp;: <b>{entity.rack}</b></li>
                        <li>Slot    &emsp;&emsp;: <b>{entity.slot}</b></li>
                        <li>Driver  &emsp;&emsp;: <b>{entity.driver}</b></li>
                    </ul> */}
                </div>
            </Dialog>




            <h3>{type === 0 ? 'Création' : 'Modification'} d'une Entité</h3>
            <hr />


            <form
                action={action}
                className="p-fluid"
            >
                <div className="col-12">


                    {/** Entity */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="entity" className="input-field">
                                Entité
                            </label>
                        </div>

                        <InputText id="entity"
                            name='entity'
                            value={initialData.entity}
                            // onChange={onChangedInput}
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors.entity ? 'p-invalid' : '')}

                            placeholder="Code entité..."
                            // required
                            tooltip="Définir un nom d'entity ou corporate..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.entity
                                &&
                                <div className="text-red-500">
                                    {formState.errors.entity?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>


                    </div>





                    {/** Designation */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="designation" className="input-field">
                                Désignation
                            </label>
                        </div>

                        <InputText id="designation"
                            name='designation'
                            value={initialData.designation}
                            // onChange={onChangedInput}
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors.designation ? 'p-invalid' : '')}

                            placeholder="Désignation entité..."
                            // required
                            tooltip="Définir une designation correspondant au code..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.designation
                                && <div className="text-red-500">
                                    {formState.errors.designation?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>


                    </div>



                    {/** Builded */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="builded" className="input-field">
                                Année
                            </label>
                        </div>

                        <InputNumber id="builded"
                            name='builded'
                            value={initialData.builded}
                            // onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            placeholder={'ex: ' + new Date().getFullYear()}
                            // required={entity.}
                            tooltip="Information de communication modbus"
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.builded
                                && <div className="text-red-500">
                                    {formState.errors.builded?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>
                    </div>


                    {/** Main */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="main" className="input-field">
                                Principale
                            </label>
                        </div>
                        <Checkbox id="main"
                            name='main'
                            checked={initialData.main}
                            // onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            // placeholder="check"
                            // required={entity.webhook}
                            tooltip="Indique si constitue l'entité principale..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.main
                                && <div className="text-red-500">
                                    {formState.errors.main?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>
                    </div>


                    {/** Activated */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="activated" className="input-field">
                                Activé
                            </label>
                        </div>
                        <Checkbox id="activated"
                            name='activated'
                            checked={initialData.activated}
                            // onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            // placeholder="check"
                            // required={entity.webhook}
                            tooltip="active l'entité pour utilisation..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.activated
                                && <div className="text-red-500">
                                    {formState.errors.activated?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>
                    </div>





                    {/** logoPath */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="logoPath" className="input-field">
                                Chemin Logo
                            </label>
                        </div>

                        <InputText id="logoPath"
                            name='logoPath'
                            value={initialData.logoPath}
                            // onChange={onChangedInput}
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors.logoPath ? 'p-invalid' : '')}

                            placeholder="Logo entité..."
                            // required
                            tooltip="Définir un logo par son chemin..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.logoPath
                                && <div className="text-red-500">
                                    {formState.errors.logoPath?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>


                    </div>


                    {/** Locations */}
                    <DropDownLocations formAction={formAction} type={type} initialData={initialData} />









                    {/** Command options */}
                    <div className='grid'>
                        <div
                            className='col-12 md:col-3 mt-0 '>
                            <Button label="Enregistrer" icon="pi pi-check"
                                type='submit'
                                severity="success"
                                // className='col-12 md:col-3 mt-0 '
                                tooltip='Enregistrer les informations'
                                tooltipOptions={{ position: 'bottom' }}
                            // onClick={(e) => onSubmit(e)}
                            />
                        </div>


                        <Link href="./"
                            className='col-12 md:col-3 mt-0 '>
                            <Button label="Annuler" icon="pi pi-undo"
                                severity="secondary"
                                // className="col-12 md:col-2  m-1"
                                tooltip='Annuler en effaçant les informations enregistré'
                                tooltipOptions={{ position: 'bottom' }}
                                onClick={e => initialData(model.defaults)}
                            />
                        </Link>
                        <Link href="./../"
                            className='col-12 md:col-3 mt-0 '>
                            <Button label="Lister" icon="pi pi-list"
                                severity="info"
                                // className="col-12 md:col-2  m-1"
                                tooltip='Retourner au tableau de données'
                                tooltipOptions={{ position: 'bottom' }}
                            />
                        </Link>

                    </div>



                </div>

            </form>


        </div>


    </>
}