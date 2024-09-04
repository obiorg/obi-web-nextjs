// src/components/post-form.tsx

// this is a client component
'use client'

import Link from "next/link"
import { useFormState } from "react-dom"
import { LocationsModel } from "@/src/obi/models/localisations/LocationsModel"
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
import DropDownCountries from "../../counties/components/dropdown"
import DropDownStates from "../../states/components/dropdown"
import DropDownCities from "../../cities/components/dropdown"

const model = new LocationsModel();




// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function PostForm({ formAction, type, initialData }: OBI.LocationsPostFormProps) {
    // Initialize the form state and action
    const [formState, action] = useFormState<OBI.LocationsFormState>(formAction, {
        errors: {},
    })

    // Used for toast
    const toast = useRef<Toast>(null);

    // Used for dialog
    const [showMessage, setShowMessage] = useState(false);
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;



    const onChangedCountry = (e: any) => {
        initialData.country = e.value
    }


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




            <h3>{type === 0 ? 'Création' : 'Modification'} d'une Localisation</h3>
            <hr />


            <form
                action={action}
                className="p-fluid"
            >
                <div className="col-12">


                    {/** Location */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="location" className="input-field">
                                Localisation
                            </label>
                        </div>

                        <InputText id="location"
                            name='location'
                            value={initialData.location}
                            // onChange={onChangedInput}
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors.location ? 'p-invalid' : '')}

                            placeholder="Code localisation..."
                            // required
                            tooltip="Définir un code de localisation..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.location
                                &&
                                <div className="text-red-500">
                                    {formState.errors.location?.join(', ')} {/* // Display form errors related to the title field*/}
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



                    {/** Group */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="group" className="input-field">
                                Groupe
                            </label>
                        </div>

                        <InputText id="group"
                            name='group'
                            value={initialData.group}
                            // onChange={onChangedInput}
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors.group ? 'p-invalid' : '')}

                            placeholder="Groupe..."
                            // required
                            tooltip="Définir un code de groupe..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.group
                                &&
                                <div className="text-red-500">
                                    {formState.errors.group?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>


                    </div>


                    {/** Country */}
                    <DropDownCountries
                        id='country'
                        name="country"
                        title='Pays'
                        handleOnchange={(e: any) => { onChangedCountry(e) }}
                        value={initialData.country}
                        formState={formState}
                    />



                    {/** State */}
                    <DropDownStates formAction={formAction} type={type} initialData={initialData} />

                    {/** City */}
                    <DropDownCities formAction={formAction} type={type} initialData={initialData} />






                    {/** address */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="address" className="input-field">
                                Adresse
                            </label>
                        </div>

                        <InputText id="address"
                            name='address'
                            value={initialData.address}
                            // onChange={onChangedInput}
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors.address ? 'p-invalid' : '')}

                            placeholder="ex: rue de la devanture..."
                            // required
                            tooltip="Correspond à la totalité ou partie de la rue, avenue..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.address
                                && <div className="text-red-500">
                                    {formState.errors.address?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>
                    </div>


                    {/** address1 */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="address1" className="input-field">
                                Adresse suite 1
                            </label>
                        </div>

                        <InputText id="address1"
                            name='address1'
                            value={initialData.address1}
                            // onChange={onChangedInput}
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors.address1 ? 'p-invalid' : '')}

                            placeholder="ex: derrière la rue du chêne..."
                            // required
                            tooltip="Complément d'infos sur l'adresse..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.address1
                                && <div className="text-red-500">
                                    {formState.errors.address1?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>
                    </div>


                    {/** address3 */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="address3" className="input-field">
                                Adresse suite 2
                            </label>
                        </div>

                        <InputText id="address3"
                            name='address3'
                            value={initialData.address3}
                            // onChange={onChangedInput}
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors.address3 ? 'p-invalid' : '')}

                            placeholder="ex: entre les palmiers..."
                            // required
                            tooltip="Complément d'informations sur l'adresse..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.address3
                                && <div className="text-red-500">
                                    {formState.errors.address3?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>
                    </div>



                    {/** bloc */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="bloc" className="input-field">
                                Bloc
                            </label>
                        </div>

                        <InputText id="bloc"
                            name='bloc'
                            value={initialData.bloc}
                            // onChange={onChangedInput}
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors.bloc ? 'p-invalid' : '')}

                            placeholder="Bloc ex: 3 ou 3B ..."
                            // required
                            tooltip="Bloc ou bâtiment dans un lotissement ou parc industriel..."
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.bloc
                                && <div className="text-red-500">
                                    {formState.errors.bloc?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>
                    </div>


                    {/** floor */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="floor" className="input-field">
                                Étage
                            </label>
                        </div>

                        <InputNumber id="floor"
                            name='floor'
                            value={initialData.floor}
                            // onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            placeholder="ex: 3"
                            // required={entity.}
                            tooltip="Numéro d'étage ou de plateau"
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.floor
                                && <div className="text-red-500">
                                    {formState.errors.floor?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>
                    </div>


                    {/** number */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="number" className="input-field">
                                Numéro
                            </label>
                        </div>

                        <InputText id="number"
                            name='number'
                            value={initialData.number}
                            // onChange={onChangedInput}
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors.number ? 'p-invalid' : '')}

                            placeholder="ex: 6B ou 3, 3A..."
                            // required
                            tooltip="Numéro de porte"
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {
                                formState.errors.number
                                && <div className="text-red-500">
                                    {formState.errors.number?.join(', ')} {/* // Display form errors related to the title field*/}
                                </div >
                            }
                        </div>


                    </div>












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