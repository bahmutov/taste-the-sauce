import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'

describe('Regular user', { viewportHeight: 1200 }, () => {
  beforeEach(() => {
    const user: LoginInfo = Cypress.env('users').standard
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
  })

  it('sees unique thumbnail images', () => {
    // get all inventory item images
    // and confirm there are more than 3 items
    cy.get('img.inventory_item_img')
      .should('have.length.greaterThan', 3)
      // get the attribute "src" from each element
      .mapInvoke('getAttribute', 'src')
      // and pass it to a "should(callback)" function
      .should((urls: string[]) => {
        // we want to confirm the following in these image urls:
        // all urls should be unique
        const unique = Cypress._.uniq(urls)
        expect(unique, 'image urls').to.have.length(urls.length)
        // no url includes "sl-404" string
        urls.forEach((url, k) => {
          expect(url, `url ${k + 1}`).to.not.include('sl-404')
        })
      })
  })

  it('loads every image', () => {
    // iterate over every image on the page
    // https://on.cypress.io/get
    // https://on.cypress.io/each
    // confirm the image element has loaded using its naturalWidth property
    // Tip: include the alt text in the assertion message
    cy.get('img').each(($image: JQuery<HTMLImageElement>) => {
      // $image is a jQuery object with a single IMG element inside
      const src = $image[0].src
      // src could be data images or pretty long URL
      // let's skip the middle part
      const short = src.slice(0, 20) + '...' + src.slice(src.length - 20)
      const alt = $image[0].alt
      expect(
        $image[0].naturalWidth,
        `natural width for "${alt}"`,
      ).to.be.greaterThan(0)
    })
  })
})
