export default class Endpoint {
    static get baseUrl(): string {
        console.log(window);
        
        return `/api`
    }

    static get get_patient_reception_table(): string {
        return Endpoint.baseUrl + Endpoint._get_patient_reception_table
    }




    private static _get_patient_reception_table = "/patientreception/getpatient"
}