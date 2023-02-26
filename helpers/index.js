function formatearDinero (cantidad) {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export { formatearDinero };