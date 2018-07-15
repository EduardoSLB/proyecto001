import * as jsPDF from 'jspdf';



export function generarDocumento(original) {
    //console.log(original)
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
    var doc = new jsPDF({
        unit: 'mm',
        orientation: 'landscape'
    })
    let apeee = original.ApeUsu.split(' ')
    let nomss = original.NomUsu.split(' ')
    doc.save(apeee[0] + ", " + nomss[0] + " [Resumen].pdf")
    /*console.log("Original")
    console.log(original)
    console.log("Terrenos")
    console.log(terrenos)
    console.log("Ganado")
    console.log(ganado)
    console.log("Obligaciones")
    console.log(obligaciones)
    console.log("Deudas")
    console.log(deudas)
    */
}

export function generarTerrenos(original, terrenos) {
    var doc = new jsPDF({
        unit: 'mm',
        orientation: 'landscape'
    })
    let apeee = original.ApeUsu.split(' ')
    let nomss = original.NomUsu.split(' ')
    doc.save(apeee[0] + ", " + nomss[0] + " [Terrenos].pdf")
    console.log(terrenos)
}

export function generarGanado(original, ganado) {
    var doc = new jsPDF({
        unit: 'mm',
        orientation: 'landscape'
    })
    let apeee = original.ApeUsu.split(' ')
    let nomss = original.NomUsu.split(' ')
    doc.save(apeee[0] + ", " + nomss[0] + " [Ganado].pdf")
    console.log(ganado)
}

export function generarAnexo(nombre) {
    var doc = new jsPDF({
        unit: 'mm'
    })

    doc.save("Reporte " + nombre + ".pdf")
}


export function reporteObligacion() {
    //Pendiente, importante los primeros tres. Mañana los números automáticos, las fotos, y listo. Pedir paga y explicar el pequeño problema
}
