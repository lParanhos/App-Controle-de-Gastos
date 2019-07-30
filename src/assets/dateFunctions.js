export function formatDate(changedDate) {
    if (changedDate !== '') {
        typeof("tupe", changedDate)
        let dia = new Date(changedDate).getDate();
        if (dia < 10) {
            dia = "0" + dia;
        }
        let mes = new Date(changedDate).getMonth() + 1;
        if (mes < 10) {
            mes = "0" + mes;
        }
        let ano = new Date(changedDate).getFullYear();

        return { dia, mes, ano };
    }else {
        return false
    }


}