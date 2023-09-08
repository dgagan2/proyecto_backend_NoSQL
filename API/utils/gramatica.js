function quitarAcentos(data){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return data.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

function primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports={quitarAcentos, primeraLetraMayuscula}