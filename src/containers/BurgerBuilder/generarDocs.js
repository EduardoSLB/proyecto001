import * as jsPDF from 'jspdf';

export function generarDocumento(original) {
    var doc = new jsPDF({
        unit: 'mm'
    })

    doc.setFontStyle("Roman")
    doc.rect(9, 6, 113, 12.5, 'S')
    doc.setTextColor("#0e6600")
    doc.setFontSize(18)
    doc.text('COMUNIDAD CAMPESINA DE PALCA', 10, 12)
    doc.setFontSize(10)
    doc.text('Reconocido Oficialmente el 28 de Diciembre de 1933', 12, 16)
    doc.setFontSize(25)
    doc.setTextColor("#002966")
    doc.setFontStyle('bold')
    doc.text('Cédula de Datos Generales del Comunero', 29, 32)
    doc.rect(21, 33.5, 170, 1.5)
    doc.setFontSize(11).setTextColor("#000000")
    doc.text("Fotografía", 38, 70)
    doc.setFontSize(14)
    doc.rect(30, 45.5, 35, 40)
    doc.text("CARNET N°", 146, 54)
    doc.setFontSize(18)
    let carne = original.CodUsu + ""
    if (carne.length < 5) {
        let n = carne.length
        for (var i = n; 5 - i !== 0; i++) {
            carne = "0" + carne
        }
    }
    doc.text(carne + "", 151, 63)
    doc.rect(142, 56, 37, 10)

    doc.setFontSize(12);
    doc.rect(22, 91, 170, 119)
    doc.rect(22, 107, 170, 33)
    doc.rect(22, 185, 170, 17.5)

    doc.text("Apellidos", 24, 96)
    doc.text("Nombres", 24, 104)

    doc.text("Fecha de Nacimiento", 24, 112)
    doc.text("N° Documento Identidad", 24, 120)
    doc.text("Ocupación", 136, 120)
    doc.text("Grado de Instrucción", 24, 128)
    doc.text("Estado Civil", 136, 128)
    doc.text("Hijo(a) - Yerno (Nuera)", 24, 136)

    doc.text("Dirección", 24, 148)
    doc.text("Anexo", 24, 156)
    doc.text("Distrito", 24, 164)
    doc.text("Provincia", 24, 172)
    doc.text("Departamento", 24, 180)

    doc.text("Fecha de Ingreso", 24, 192)
    doc.text("Por acuerdo de", 130, 192)
    doc.text("Clase de Afinidad", 24, 200)

    doc.setFontStyle("normal")
    doc.text(original.ApeUsu + "", 82, 96)
    doc.text(original.NomUsu + "", 82, 104)

    doc.text(original.FecNac + "", 82, 112)
    doc.text(original.NumDoc + "", 82, 120)
    doc.text(original.GraIns + "", 82, 128)
    doc.text(original.PadUsu + "", 82, 136)

    doc.text(original.DesOcu, 162, 120)
    doc.text(original.DesCiv, 162, 128)

    doc.text(original.DirUsu + "", 82, 148)
    doc.text(original.NomAne + "", 82, 156)
    doc.text(original.NomDis + "", 82, 164)
    doc.text(original.NomPro + "", 82, 172)
    doc.text(original.NomDep + "", 82, 180)

    doc.text(original.FecIng, 82, 192)
    doc.text(original.tipo, 82, 200)

    doc.text(original.AsaSes, 162, 192)

    doc.setFontStyle("italic").setFontSize(11)
    doc.text("En caso de fallecer mis derechos quedarán a favor de:", 24, 208)
    doc.text(original.NomHer, 118, 208)

    doc.setFontStyle("normal").setFontSize(16)
    doc.text("PROMESA DE HONOR", 80, 218)
    doc.setFontStyle("italic").setFontSize(12)
    doc.text("Me comprometo a cumplir fielmente las Disposiciones emanadas en el Estatuto y el Reglamento Interno", 22, 226)
    doc.text("a favor de la Comunidad", 86, 232)

    doc.setFontStyle("normal").setFontSize(10)
    doc.rect(22, 280, 56, 0.1)
    doc.text("Firma y Sello del Presidente C.C.P", 26, 285)
    doc.rect(134, 280, 56, 0.1)
    doc.text("Firma y Sello del Secretario C.C.P", 138, 285)

    doc.rect(38, 250, 41, 0.1)
    let mensaje = original.ApeUsu + ", " + original.NomUsu
    let indice = 35
    if (mensaje.length > 27) {
        indice = 28
    }
    if (mensaje.length > 31) {
        indice = 24
    }
    doc.text(mensaje, indice, 255)
    doc.text("Firma del Comunero", 44, 260)

    doc.setFontStyle("normal").setFontSize(12)
    doc.rect(92, 236, 28, 28)
    doc.text("H.D", 102, 254)

    doc.setFontStyle("bold").setFontSize(10)
    doc.text("Fecha de Ratificación Actual: ", 128, 250)
    doc.text("Fecha de Ratificación Anterior: ", 128, 258)

    if (original.FecRei18 === undefined) {
        original.FecRei18 = ""
    }
    if (original.FecRei16 === undefined) {
        original.FecRei18 = ""
    }
    doc.setFontStyle("normal").setFontSize(10)
    doc.text(original.FecRei12 + "", 180, 250)
    doc.text(original.FecRei10 + "", 180, 258)

    doc.save(original.ApeUsu + " " + original.NomUsu + ' [Cédula].pdf')
}

export function generarCarne(original) {
    var doc = new jsPDF({
        unit: 'mm',
    })
    /*
    doc.rect(9,78,116.5, 75)
    doc.rect(14, 101, 33, 38)
    */
    //marco
    doc.setDrawColor("#85b517")
    doc.rect(9, 30, 116.5, 75)
    //foto
    doc.rect(14, 53, 33, 38)

    doc.setTextColor("#85b517")
    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.setFontSize(13)

    doc.text("Fotografía", 19.5, 72)
    doc.text("COMUNIDAD CAMPESINA DE PALCA", 13.5, 40)
    doc.setFontType('bold')
    doc.setFontSize(10)
    //doc.rect(99,34,22.5,12)
    doc.text("CARNET N°: ", 100, 39)
    doc.setFontSize(8)

    doc.text("RECONOCIDA OFICIALMENTE EL 28 DE DICIEMBRE DE 1933", 14, 44.5)
    doc.setFontSize(7)
    doc.text("Sede Social San Martin 510 - PALCA - TARMA", 29, 48)
    doc.setFontSize(8)
    doc.text("APELLIDOS:", 50, 55)
    doc.text("FECHA DE INSCRIPCIÓN", 88, 55)
    doc.rect(87, 52, 37, 10)
    doc.rect(87, 62, 37, 10)
    doc.rect(87, 72, 37, 10)
    doc.rect(91, 93, 29, 0.1)
    doc.text("NOMBRES:", 50, 70)
    doc.text("FECHA DE RATIFICACIÓN", 88, 65)
    doc.text("FECHA DE CADUCIDAD", 88, 75)
    doc.text("Voto Presiente", 96, 96)
    doc.text("ANEXO O BARRIO:", 50, 85)

    doc.text(original.DesDoc + ":", 50, 95)

    let apes = original.ApeUsu.split(' ');


    doc.setTextColor("#000000")
    doc.setFontSize(9)
    doc.text(apes[0] + "", 54, 60)
    doc.text(original.FecIng + "", 96, 60)
    doc.text(original.FecRei16 + "", 96, 70)
    doc.text("31/12/2018", 96, 80)
    if (apes[1])
        doc.text(apes[1] + "", 54, 65)

    let noms = original.NomUsu.split(' ');

    doc.text(noms[0], 54, 75)
    if (noms[1]) {
        if (noms[2]) {
            doc.text(noms[1] + "" + noms[2], 54, 80)
        } else {
            doc.text(noms[1], 54, 80)
        }
    }

    doc.text(original.NomAne + "", 54, 90)
    doc.text(original.NumDoc + "", 60, 95)
    doc.setFontSize(12)
    let carne = original.CodUsu + ""
    if (carne.length < 5) {
        let n = carne.length
        for (var i = n; 5 - i !== 0; i++) {
            carne = "0" + carne
        }
    }
    doc.text(carne + "", 104, 44.5)

    doc.rect(9, 120, 116.5, 75)
    doc.setFontSize(12)
    doc.setTextColor("#85b517")
    doc.text("REGISTRO DE COMUNEROS CALIFICADOS", 20, 130)
    doc.setFontStyle("normal")
    doc.text("Ley N° 24656 D.S. 008 91 TR", 40, 135)
    doc.setFontSize(8)
    doc.text("Distrito", 20, 165)
    doc.text("Provincia", 60, 165)
    doc.text("Departamento", 100, 165)
    doc.setFontSize(10)
    doc.setFontStyle("bold")
    doc.text(original.NomDis + "", 20, 170)
    doc.text(original.NomPro + "", 60, 170)
    doc.text(original.NomDep + "", 100, 170)
    doc.setFontSize(9)
    doc.text("Este documento constituye la identidad personal del", 30, 187)
    doc.text("Comunero inscrito en el padrón general", 38, 192)
    let apeee = original.ApeUsu.split(' ')
    let nomss = original.NomUsu.split(' ')
    doc.save(apeee[0] + ", " + nomss[0] + " [Carne].pdf")

}

export function generarResumen(original, terrenos, ganado, obligaciones, deudas) {
    let limite = 10
    let reporteDeudas = generarReporteObligacionesResumen(obligaciones, deudas, original.CodUsu)
    var doc = new jsPDF({
        unit: 'mm',
        orientation: 'landscape'
    })

    let aGanado = []
    for (let key in ganado) {
        aGanado.push(ganado[key])
    }

    let aTerrenos = []
    for (let key in terrenos) {
        aTerrenos.push(terrenos[key])
    }

  

    //Calcular páginas en total
    let sganado = aGanado.length
    let sdeudas = reporteDeudas.length
    let sterrenos = aTerrenos.length
    let Pages
    if (sganado > sdeudas && sganado > sterrenos) {
        Pages = Math.ceil(sganado / limite)
    }

    if (sdeudas > sganado && sdeudas > sterrenos) {
        Pages = Math.ceil(sdeudas / limite)
    }

    if (sterrenos > sganado && sterrenos > sdeudas) {
        Pages = Math.ceil(sterrenos / limite)
    }

    if (Pages === 0) {
        Pages = 1
    }

    for (let p = 0; p < Pages; p++) {
        if (p !== 0)
            doc.addPage()

        //Imagen chévere
        doc.setFontStyle("Roman")
        doc.rect(9, 6, 113, 12.5, 'S')
        doc.setTextColor("#0e6600")
        doc.setFontSize(18)
        doc.text('COMUNIDAD CAMPESINA DE PALCA', 10, 12)
        doc.setFontSize(10)
        doc.text('Reconocido Oficialmente el 28 de Diciembre de 1933', 12, 16)
        //Titulo
        doc.setFontSize(25)
        doc.setTextColor("#002966")
        doc.setFontStyle('bold')
        doc.text('RESUMEN GENERAL', 110, 32)
        doc.rect(21, 33.5, 255, 1.5)
        //Código
        doc.setTextColor("#000000")
        doc.setFontSize(14)
        doc.text("CARNET N°", 246, 8)
        doc.setFontSize(18)
        let carne = original.CodUsu + ""
        if (carne.length < 5) {
            let n = carne.length
            for (var i = n; 5 - i !== 0; i++) {
                carne = "0" + carne
            }
        }
        doc.text(carne + "", 250, 17)
        doc.rect(240, 10, 37, 10)

        //Datos personales
        doc.setFontSize(13)
        doc.text("Nombres: ", 20, 47)
        doc.text(original.NomUsu, 45, 47)
        doc.text("Apellidos: ", 20, 57)
        doc.text(original.ApeUsu, 45, 57)
        doc.text("Código: ", 140, 47)
        doc.text(carne + "", 180, 47)
        doc.text("Anexo o Barrio: ", 140, 57)
        doc.text(original.NomAne, 180, 57)

        //Cabecera de la tabla

        doc.setFontSize(11)
        doc.rect(18, 67, 262, 7)

        doc.rect(18, 67, 90, 7)
        doc.text("Terrenos", 20, 72)

        doc.rect(108, 67, 80, 7)
        doc.text("Ganado", 110, 72)

        doc.text("Obligaciones", 190, 72)
        doc.setFontSize(10)

        doc.rect(18, 74, 262, 7)
        //Terreno
        doc.rect(18, 74, 15, 7) //Codigo
        doc.text("Código", 20, 79)

        doc.rect(33, 74, 30, 7) //Lugar
        doc.text("Lugar", 35, 79)

        doc.rect(63, 74, 24, 7) //Observaciones
        doc.text("Observ.", 65, 79)

        doc.rect(87, 74, 10, 7) //Extensión
        doc.text("Ext.", 89, 79)

        doc.rect(97, 74, 11, 7) //Costo
        doc.text("Costo", 98, 79)

        //Ganado
        doc.rect(108, 74, 15, 7) //Codigo
        doc.text("Código", 110, 79)


        doc.rect(123, 74, 30, 7) //Lugar
        doc.text("Tipo", 125, 79)

        doc.rect(153, 74, 11, 7) //Cantidad
        doc.text("Cant.", 154, 79)


        doc.rect(164, 74, 11, 7) //Costo
        doc.text("Costo", 165, 79)

        doc.rect(175, 74, 13, 7) //Total
        doc.text("Total", 176, 79)


        //Obligaciones
        doc.rect(188, 74, 15, 7) //Codigo
        doc.text("Código", 190, 79)


        doc.rect(203, 74, 30, 7) //Obligación
        doc.text("Obligación", 205, 79)

        doc.rect(233, 74, 20, 7) //Fecha
        doc.text("Fecha", 235, 79)


        doc.rect(253, 74, 13, 7) //AsiFae
        doc.text("AsiFae", 255, 79)

        doc.rect(266, 74, 14, 7) //Valor
        doc.text("Valor", 268, 79)


        //Bucle para los datos de la tabla
        let y = 0
        let altura = 7

        for (let m = p * limite; m < (p + 1) * limite && m < sterrenos; m++) {
            //doc.rect(18, 81 + y * altura, 262, 7)
            //Terreno
            doc.rect(18, 81 + y * altura, 15, 7) //Codigo
            doc.text(aTerrenos[m]["CodTerr"] + "", 20, 85 + y * altura)

            doc.rect(33, 81 + y * altura, 30, 7) //Lugar
            doc.text(aTerrenos[m]["NomAne"] + "", 35, 85 + y * altura)

            doc.rect(63, 81 + y * altura, 24, 7) //Observaciones
            let texto = aTerrenos[m]["Observa"] + ""
            if (texto.length > 13) {
                texto = texto.substring(0, 10) + "..."
            }
            doc.text(texto, 65, 85 + y * altura)

            doc.rect(87, 81 + y * altura, 10, 7) //Extensión
            doc.text(aTerrenos[m]["ExtTer"] + "", 89, 85 + y * altura)

            doc.rect(97, 81 + y * altura, 11, 7) //Costo
            doc.text(aTerrenos[m]["CostoT"] + "", 98, 85 + y * altura)
            y++
        }

        let x = 0
        for (let m = p * limite; m < (p + 1) * limite && m < sganado; m++) {
            //doc.rect(18, 81 + x * altura, 262, 7)
            //Ganado
            let terreno = aGanado[m]
            doc.rect(108, 81 + x * altura, 15, 7) //Codigo
            doc.text(terreno["CodGan"] + "", 110, 85 + x * altura)


            doc.rect(123, 81 + x * altura, 30, 7) //Lugar
            doc.text(terreno["DesGan"] + "", 125, 85 + x * altura)

            doc.rect(153, 81 + x * altura, 11, 7) //Cantidad
            doc.text(terreno["CanGan"] + "", 154, 85 + x * altura)


            doc.rect(164, 81 + x * altura, 11, 7) //Costo
            doc.text(terreno["CostoG"] + "", 165, 85 + x * altura)

            doc.rect(175, 81 + x * altura, 13, 7) //Total
            doc.text((terreno["CanGan"] * terreno["CostoG"]) + "", 176, 85 + x * altura)
            x++
        }

        let z = 0
        for (let m = p * limite; m < (p + 1) * limite && m < sdeudas; m++) {
            //doc.rect(18, 81 + z * altura, 262, 7)
            //Obligaciones
            let obligacion = reporteDeudas[m]
            doc.rect(188, 81 + z * altura, 15, 7) //Codigo
            doc.text(obligacion["CodObl"] + "", 190, 85 + z * altura)


            doc.rect(203, 81 + z * altura, 30, 7) //Obligación
            doc.text(obligacion["DesObl"] + "", 205, 85 + z * altura)

            doc.rect(233, 81 + z * altura, 20, 7) //Fecha
            doc.text(obligacion["FecObl"] + "", 235, 85 + z * altura)


            doc.rect(253, 81 + z * altura, 13, 7) //AsiFae
            let mensaje = ""
            if (obligacion["pago"]) {
                mensaje = "Sí"
            } else {
                mensaje = "No"
            }
            doc.text(mensaje, 255, 85 + z * altura)

            doc.rect(266, 81 + z * altura, 14, 7) //Valor
            doc.text(obligacion["Valor"] + "", 268, 85 + z * altura)
            z++
        }

        doc.setFontSize(12)
        //Costo por Terrenos
        if (p === Pages - 1) {
            let costoTerrenos = 0
            for (let key in aTerrenos) {
                costoTerrenos = costoTerrenos + aTerrenos[key]["CostoT"]
            }
            doc.text("Costo por Terrenos: S./ " + costoTerrenos, 40, 170)
            //Costo por Ganado
            let costoGanado = 0
            for (let key in aGanado) {
                costoGanado = costoGanado + aGanado[key]["CanGan"] * aGanado[key]["CostoG"]
            }
            doc.text("Costo por Ganado: S./ " + costoGanado, 140, 170)
            //Costo por Obligaciones
            let costoObl = 0
            for (let key in reporteDeudas) {
                if (!reporteDeudas[key]["pago"])
                    costoObl = costoObl + reporteDeudas[key]["Valor"] * 1
            }
            doc.text("Costo por Obligaciones: S./ " + costoObl, 200, 170)

            //Costo Total
            let total = costoTerrenos + costoGanado + costoObl
            doc.text("Total Deuda: S./ " + total, 140, 180)
        }

        //Fecha de Impresión

        doc.setFontSize(11)
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        doc.text("Fecha de Impresión: " + today, 220, 45)

        let pagina = p * 1 + 1
        doc.text("N° Pág: " + pagina, 260, 193)

    }

    //Nombre del documento 
    let apeee = original.ApeUsu.split(' ')
    let nomss = original.NomUsu.split(' ')

    doc.save(apeee[0] + ", " + nomss[0] + " [Resumen].pdf")




}

function generarReporteObligacionesResumen(obligaciones, deudas, codigo) {

    let reporteDeudas = []

    for (let key in obligaciones) {

        if (deudas[key][codigo] === "1") {
            let object = {
                ...obligaciones[key],
                pago: false
            }
            reporteDeudas.push(object)
        }
        if (deudas[key][codigo] === "0") {
            let object = {
                ...obligaciones[key],
                pago: true
            }
            reporteDeudas.push(object)
        }


    }

    return reporteDeudas
}

export function generarTerrenos(original, terrenos) {
    let limite = 10
    let aTerrenos = []
    for (let key in terrenos) {
        aTerrenos.push(terrenos[key])
    }

    var doc = new jsPDF({
        unit: 'mm',
        orientation: 'landscape'
    })

    let Pages = Math.ceil(aTerrenos.length / limite)
    if (Pages === 0) {
        Pages = 1
    }
    for (let p = 0; p < Pages; p++) {
        if (p !== 0)
            doc.addPage()

        //Imagen chévere
        doc.setFontStyle("Roman")
        doc.rect(9, 6, 113, 12.5, 'S')
        doc.setTextColor("#0e6600")
        doc.setFontSize(18)
        doc.text('COMUNIDAD CAMPESINA DE PALCA', 10, 12)
        doc.setFontSize(10)
        doc.text('Reconocido Oficialmente el 28 de Diciembre de 1933', 12, 16)
        //Titulo
        doc.setFontSize(25)
        doc.setTextColor("#002966")
        doc.setFontStyle('bold')
        doc.text('CÉDULA DE MIS TERRENOS', 90, 32)
        doc.rect(21, 33.5, 255, 1.5)
        //Código
        doc.setTextColor("#000000")
        doc.setFontSize(14)
        doc.text("CARNET N°", 246, 8)
        doc.setFontSize(18)
        let carne = original.CodUsu + ""
        if (carne.length < 5) {
            let n = carne.length
            for (var i = n; 5 - i !== 0; i++) {
                carne = "0" + carne
            }
        }
        doc.text(carne + "", 250, 17)
        doc.rect(240, 10, 37, 10)


        //Cabecera de la tabla
        doc.setFontSize(11)
        doc.rect(18, 47, 262, 12)

        doc.rect(18, 47, 22, 12)
        doc.text("Código", 20, 54)

        doc.rect(40, 47, 32, 12)
        doc.text("Lugar", 42, 54)

        doc.rect(72, 47, 35, 12)
        doc.text("Punto Denominado", 74, 54)

        doc.rect(107, 47, 32, 12)
        doc.text("Norte", 109, 54)

        doc.rect(139, 47, 32, 12)
        doc.text("Sur", 141, 54)

        doc.rect(171, 47, 32, 12)
        doc.text("Este", 173, 54)

        doc.rect(203, 47, 32, 12)
        doc.text("Oeste", 205, 54)

        doc.rect(235, 47, 24, 12)
        doc.text("Tongos", 237, 54)

        doc.text("M2", 261, 54)

        //Bucle para los datos de la tabla
        let y = 0
        for (let m = p * limite; m < (p + 1) * limite && m < aTerrenos.length; m++) {
            //Generar Cuadrículas
            doc.setFontSize(10)
            doc.rect(18, 59 + y * 5, 262, 5)

            doc.rect(18, 59 + y * 5, 22, 5) //codigo
            doc.text(aTerrenos[m]["CodTerr"] + "", 20, 63 + y * 5)

            doc.rect(40, 59 + y * 5, 32, 5) //lugar
            doc.text(aTerrenos[m]["NomAne"] + "", 42, 63 + y * 5)

            doc.rect(72, 59 + y * 5, 35, 5) //punto denominado
            doc.text(aTerrenos[m]["NomBar"] + "", 74, 63 + y * 5)

            doc.rect(107, 59 + y * 5, 32, 5) //norte
            doc.text(aTerrenos[m]["ColNor"] + "", 109, 63 + y * 5)

            doc.rect(139, 59 + y * 5, 32, 5) //sur
            doc.text(aTerrenos[m]["ColSur"] + "", 141, 63 + y * 5)

            doc.rect(171, 59 + y * 5, 32, 5) //este
            doc.text(aTerrenos[m]["ColEst"] + "", 173, 63 + y * 5)

            doc.rect(203, 59 + y * 5, 32, 5) //oeste
            doc.text(aTerrenos[m]["ColOes"] + "", 205, 63 + y * 5)

            doc.rect(235, 59 + y * 5, 24, 5) //tongos
            doc.text(aTerrenos[m]["ExtTer"] + "", 237, 63 + y * 5)

            //M2
            doc.text(aTerrenos[m]["M2"] + "", 261, 63 + y * 5)
            y++
        }


        //Fecha de Impresión
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        doc.text("Fecha de Impresión: " + today, 240, 45)

        //Mensaje Declaro poseer Tongos M2 Equivalente a 
        let totalTongos = 0,
            m2Total = 0
        for (let u in aTerrenos) {
            totalTongos = totalTongos + aTerrenos[u]["ExtTer"] + 0
            m2Total = m2Total + aTerrenos[u]["M2"] + 0
        }

        let hectareas = m2Total * 0.0001
        doc.text("Declaro poseer la siguiente cantidad de terrenos     " + totalTongos + " Tongos  igual a    " + m2Total + " M2 equivalente a " + hectareas + "Hás.", 18, 120)

        //Fecha de Ratificación Actual y Anterior
        doc.text("Fecha de Ratificación Actual (2012): " + original.FecRei12, 210, 120)
        doc.text("Fecha de Ratificación Anterior (2010): " + original.FecRei10, 210, 130)

        //Mensaje de Compromiso Primera Línea
        doc.text("Así mismo me comprometo a no transferir ni arrendar, sin el Conocimiento y Autorización del Consejo de Administración", 40, 140)
        //Mensaje de Compromiso Segunda Línea
        doc.text("En caso de incumplimiento perderé mis derechos de Comunero", 80, 150)
        //Firmas

        //Primera
        let apeee = original.ApeUsu.split(' ')
        let nomss = original.NomUsu.split(' ')
        doc.rect(38, 180, 40, .1)
        doc.text(apeee[0] + ", " + nomss[0], 38, 185)
        doc.text("(Comunero)", 41, 188)
        //Segunda
        doc.rect(120, 180, 63, .1)
        doc.text("Presidente Consejo Administración", 120, 185)
        //Tercera
        doc.rect(200, 180, 63, .1)
        doc.text("Secretario Consejo Administración", 200, 185)
        //Número de página
        let pagina = p * 1 + 1
        doc.text("N° Pág: " + pagina, 260, 193)

    }

    //Nombre del documento
    let apeee = original.ApeUsu.split(' ')
    let nomss = original.NomUsu.split(' ')
    doc.save(apeee[0] + ", " + nomss[0] + " [Terrenos].pdf")

}

export function generarGanado(original, ganado) {
    let limite = 10
    let aGanado = []
    for (let key in ganado) {
        aGanado.push(ganado[key])
    }

    var doc = new jsPDF({
        unit: 'mm',
        orientation: 'landscape'
    })

    let Pages = Math.ceil(aGanado.length / limite)
    if (Pages === 0) {
        Pages = 1
    }

    for (let p = 0; p < Pages; p++) {
        if (p !== 0)
            doc.addPage()

        //Imagen chévere
        doc.setFontStyle("Roman")
        doc.rect(9, 6, 113, 12.5, 'S')
        doc.setTextColor("#0e6600")
        doc.setFontSize(18)
        doc.text('COMUNIDAD CAMPESINA DE PALCA', 10, 12)
        doc.setFontSize(10)
        doc.text('Reconocido Oficialmente el 28 de Diciembre de 1933', 12, 16)
        //Titulo
        doc.setFontSize(25)
        doc.setTextColor("#002966")
        doc.setFontStyle('bold')
        doc.text('CÉDULA DE MIS GANADOS', 90, 32)
        doc.rect(21, 33.5, 255, 1.5)
        //Código
        doc.setTextColor("#000000")
        doc.setFontSize(14)
        doc.text("CARNET N°", 246, 8)
        doc.setFontSize(18)
        let carne = original.CodUsu + ""
        if (carne.length < 5) {
            let n = carne.length
            for (var i = n; 5 - i !== 0; i++) {
                carne = "0" + carne
            }
        }
        doc.text(carne + "", 250, 17)
        doc.rect(240, 10, 37, 10)


        //Cabecera de la tabla
        doc.setFontSize(11)
        doc.rect(18, 47, 262, 8)

        doc.rect(18, 47, 10, 8)
        doc.text("N°", 20, 52)

        doc.rect(28, 47, 26, 8)
        doc.text("Código", 30, 52)

        doc.rect(54, 47, 32, 8)
        doc.text("Descripción", 56, 52)

        doc.rect(86, 47, 10, 8)
        doc.text("Sexo", 87, 52)

        doc.rect(96, 47, 20, 8)
        doc.text("Edad", 98, 52)

        doc.rect(116, 47, 12, 8)
        doc.text("Cant", 118, 52)

        doc.rect(128, 47, 46, 8)
        doc.text("Color", 130, 52)

        doc.rect(174, 47, 34, 8)
        doc.text("Marca", 176, 52)

        doc.rect(208, 47, 34, 8)
        doc.text("Señal", 210, 52)

        doc.rect(242, 47, 18, 8)
        doc.text("Vendido", 244, 52)

        doc.text("Muerto", 262, 52)

        //Bucle para los datos de la tabla
        let y = 0
        let altura = 6
        for (let m = p * limite; m < (p + 1) * limite && m < aGanado.length; m++) {

            doc.setFontSize(10)
            doc.rect(18, 55 + y * altura, 262, altura)

            doc.rect(18, 55 + y * altura, 10, altura)
            let number = m + 1
            doc.text(number + "", 20, 59 + y * altura)

            doc.rect(28, 55 + y * altura, 26, altura)
            doc.text(aGanado[m]["CodGan"] + "", 30, 59 + y * altura)

            doc.rect(54, 55 + y * altura, 32, altura)
            doc.text(aGanado[m]["DesGan"], 56, 59 + y * altura)

            doc.rect(86, 55 + y * altura, 10, altura)
            doc.text(aGanado[m]["SexoGa"], 87, 59 + y * altura)

            doc.rect(96, 55 + y * altura, 20, altura)
            doc.text(aGanado[m]["EdadGa"], 98, 59 + y * altura)

            doc.rect(116, 55 + y * altura, 12, altura)
            doc.text(aGanado[m]["CanGan"] + "", 118, 59 + y * altura)

            doc.rect(128, 55 + y * altura, 46, altura)
            doc.text(aGanado[m]["ColGan"], 130, 59 + y * altura)

            doc.rect(174, 55 + y * altura, 34, altura)
            doc.text(aGanado[m]["MarcaGa"], 176, 59 + y * altura)

            doc.rect(208, 55 + y * altura, 34, altura)
            doc.text(aGanado[m]["SenalGa"], 210, 59 + y * altura)

            doc.rect(242, 55 + y * altura, 18, altura)

            y++
        }



        //Fecha de Impresión
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        doc.text("Fecha de Impresión: " + today, 240, 45)

        //Fecha de Ratificación Actual y Anterior
        doc.text("Fecha de Ratificación Actual (2012): " + original.FecRei12, 210, 120)
        doc.text("Fecha de Ratificación Anterior (2010): " + original.FecRei10, 210, 130)

        //Mensaje de Compromiso Primera Línea y Total Ganado
        let ganadoTotal = 0
        for (let llave in aGanado) {
            ganadoTotal = ganadoTotal + aGanado[llave]["CanGan"]
        }
        doc.text("Cantidad total de ganado: " + ganadoTotal, 40, 140)
        doc.text("Declaro bajo juramento que los datos, consignados son verdaderos; los excedentes pasarán a ser patrimonio de la Comunidad", 40, 155)
        //Mensaje de Compromiso Segunda Línea

        //Firmas

        //Primera
        let apeee = original.ApeUsu.split(' ')
        let nomss = original.NomUsu.split(' ')
        doc.rect(38, 180, 40, .1)
        doc.text(apeee[0] + ", " + nomss[0], 38, 185)
        doc.text("(Comunero)", 41, 188)
        //Segunda
        doc.rect(120, 180, 63, .1)
        doc.text("Presidente Consejo de Administración", 120, 185)
        //Tercera
        doc.rect(200, 180, 63, .1)
        doc.text("Secretario Consejo de Administración", 200, 185)
        //Número de página
        let pagina = p * 1 + 1
        doc.text("N° Pág: " + pagina, 260, 193)

    }


    //Nombre documento
    let apeee = original.ApeUsu.split(' ')
    let nomss = original.NomUsu.split(' ')
    doc.save(apeee[0] + ", " + nomss[0] + " [Ganado].pdf")

}

export function generarAnexo(nombre) {

    let limite = 30
    let comuneros = JSON.parse(localStorage.getItem("COMUNEROS"))
    //Filtrar a los comuneros con el anexo necesario
    let seleccion = []
    for (let key in comuneros) {
        if (comuneros[key]["NomAne"] === nombre)
            seleccion.push(comuneros[key])

    }

    var doc = new jsPDF({
        unit: 'mm'
    })

    let Pages = Math.ceil(seleccion.length / limite)
    if (Pages === 0) {
        Pages = 1
    }

    for (let p = 0; p < Pages; p++) {
        if (p !== 0)
            doc.addPage()


        //Imagen chévere
        doc.setFontStyle("Roman")
        doc.rect(39, 6, 130, 12.5, 'S')
        doc.setTextColor("#0e6600")
        doc.setFontSize(18)
        doc.text('COMUNIDAD CAMPESINA DE PALCA', 50, 12)
        doc.setFontSize(10)
        doc.text('Reconocido Oficialmente el 28 de Diciembre de 1933', 62, 16)
        //Titulo
        doc.setFontSize(25)
        doc.setTextColor("#002966")
        doc.setFontStyle('bold')
        doc.text('PADRÓN GENERAL DE COMUNEROS', 30, 32)
        doc.rect(21, 33.5, 175, 1.5)

        //Anexo
        doc.setTextColor("#000000")
        doc.setFontSize(14)
        doc.text("Anexo: " + nombre, 79, 45)
        doc.rect(10, 47, 194, .3)
        
        doc.setFontSize(10)
        //Cabecera
        doc.rect(12, 49, 191, 7)
        //Numero
        doc.rect(12, 49, 8, 7)
        doc.text("N°", 13, 54)
        //Codigo
        doc.rect(20, 49, 18, 7)
        doc.text("CARNET", 21, 54)
        //Apellidos
        doc.rect(38, 49, 60, 7)
        doc.text("APELLIDOS", 40, 54)
        //Nombres
        doc.rect(98, 49, 60, 7)
        doc.text("NOMBRES", 100, 54)
        //DOC IDEN N°
        doc.rect(158, 49, 26, 7)
        doc.text("DOC IDEN N°", 160, 54)
        //FIRMA
        doc.text("FIRMAS", 186, 54)

        //Bucle para los datos
        let y = 0
        let altura = 7
        for (let m = p * limite; m < (p + 1) * limite && m < seleccion.length; m++) {
            let comunero = seleccion[m]
            doc.rect(12, 56 + y * altura, 191, altura)

            doc.rect(12, 56 + y * altura, 8, altura)
            let number = m + 1
            doc.text(number + "", 13, 60 + y * altura)
            //Codigo
            doc.rect(20, 56 + y * altura, 18, altura)
            let carne = comunero["CodUsu"] + ""
            if (carne.length < 5) {
                let n = carne.length
                for (var i = n; 5 - i !== 0; i++) {
                    carne = "0" + carne
                }
            }
            doc.text(carne, 21, 60 + y * altura)
            //Apellidos 
            doc.rect(38, 56 + y * altura, 60, altura)
            doc.text(comunero["ApeUsu"] + "", 40, 60 + y * altura)
            //Nombres   
            doc.rect(98, 56 + y * altura, 60, altura)
            doc.text(comunero["NomUsu"] + "", 100, 60 + y * altura)
            //DOC IDEN N°   
            doc.rect(158, 56 + y * altura, 26, altura)
            doc.text(comunero["NumDoc"] + "", 160, 60 + y * altura)
            y++
        }


        //PIE DE PÁGINA
        doc.setFontSize(10)
        let pagina = p * 1 + 1
        doc.text("N° Pág: " + pagina, 185, 280)
        if (Pages !== 1)
            doc.text(pagina + "/" + Pages, 8, 280)

    }



    //Nombre del documento
    doc.save("Reporte " + nombre + ".pdf")
}

export function reporteObligacion() {
    //Pendiente, importante los primeros tres. Mañana los números automáticos, las fotos, y listo. Pedir paga y explicar el pequeño problema
}