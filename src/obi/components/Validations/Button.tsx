import { create } from '@/src/obi/service/connexions/MachinesActions'
import { SplitButton } from 'primereact/splitbutton'
 
export function Button() {
  return (
    <button onSubmit={create}>Create</button>
  )
}