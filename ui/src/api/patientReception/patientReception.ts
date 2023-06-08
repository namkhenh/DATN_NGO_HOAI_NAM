import { Endpoint as api } from "../helpers"
import { send } from "../helpers/http"

export class PatientReceptionService {
    public static getPatientReceptionStaticReport = () => {
        return send(`${api.get_patient_reception_table}`, 'GET')
    }
}