export default {
	install(Vue, options) {
		Vue.getCompraProfits = compra => {
			if (!compra.hasOwnProperty('obtenido') || !compra.hasOwnProperty('gastado')) { return compra }
      const profit = parseInt(compra.obtenido) - parseInt(compra.gastado)
      let signo = 0 < profit ? '+ ' : '- '
      if (profit === 0) { signo = '' }
      compra.profit = String(parseInt(compra.obtenido) - parseInt(compra.gastado))
      compra.profitString = String(signo + Math.abs(profit))
      return compra
		}
	}
};