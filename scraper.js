// Ici, on fait rentrer la grosse béquille Puppeteer dans le jeu, tu vois.
const puppeteer = require('puppeteer')

// Allez, on va se taper un petit tour sur le site, histoire de voir ce qu'il a dans le ventre.
async function tapeLincrusteSurLeSite(url) {
    // On lance le Chrome, tu vois, comme si t'étais en train de te poser tranquilou devant le PC.
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // Allez, on se pointe sur le site !
    await page.goto(url)

    // Maintenant, on va capter tous les produits, les bons plans tu vois.
    const results = await page.evaluate(() => {
        // On chope tous les produits, tranquille.
        const productElements = document.querySelectorAll('.s-result-item')
        const products = []

        // On fait un petit tour de chaque produit, histoire de voir ce qu'ils ont à offrir.
        for (let product of productElements) {
            // On chope le nom, le prix, et l'image. Les bases, quoi.
            const titleElement = product.querySelector(
                '.a-link-normal.a-text-normal',
            )
            const priceElement = product.querySelector('.a-offscreen')
            const imgElement = product.querySelector('.s-image')

            // Si y'a tout, on ajoute à la liste, sinon on zappe, pas de temps à perdre.
            if (titleElement && priceElement && imgElement) {
                const title = titleElement.innerText
                const price = priceElement.innerText
                const link = titleElement.href
                const imgSrc = imgElement.src

                // Allez, on enregistre le produit, au cas où ça nous intéresserait plus tard.
                products.push({
                    title,
                    price,
                    link,
                    imgSrc,
                })
            }
        }

        // On renvoie les produits qu'on a choppés, histoire de voir ce qu'on a dégoté.
        return products
    })

    // Bon, on a fini, on ferme le navigateur, on se casse.
    await browser.close()

    // On renvoie les produits qu'on a choppés.
    return results
}

// Allez, c'est parti, on se tape un tour sur le site d'Amazon, voir ce qu'on peut chopper.
tapeLincrusteSurLeSite(
    'https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A1292115011&ref=nav_em__nav_desktop_sa_intl_monitors_0_2_6_8',
).then((results) => {
    // On affiche ce qu'on a choppé, histoire de voir si on a fait une bonne pêche.
    console.log(results)
    const data = JSON.stringify(results)
    console.log('\n\n')
    console.log(data)
    console.log('\n\n')
    console.log(JSON.parse(data))
})
