export default function getShipCategory(dwt) {
    if (!dwt) {
        return '';
    }
    if(dwt > 0 && dwt < 2000) {
        return '0 - 1999';
    }
    if(dwt >= 2000 && dwt < 3300) {
        return '2000 - 3299';
    }
    if(dwt >= 3300 && dwt < 4500) {
        return '3300 - 4499';
    }
    if(dwt >= 4500 && dwt < 6500) {
        return '4500 - 6499';
    }
    if(dwt >= 6500) {
        return '6500+';
    }
}