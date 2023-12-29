import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'

describe('Regular user', { viewportHeight: 1200 }, () => {
  beforeEach(() => {
    // uncomment to simulate an image load failure
    // cy.intercept(
    //   { resourceType: 'image', pathname: /\/bolt-shirt/ },
    //   { statusCode: 404 },
    // )

    const user: LoginInfo = Cypress.env('users').standard
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
  })

  it('loads every image', () => {
    // iterate over every image on the page
    // https://on.cypress.io/get
    // https://on.cypress.io/each
    // confirm the image element has loaded using its naturalWidth property
    // if the image does not load, throw an error
    // with all details (alt and src attributes)
    // But if the image is ok, then there should be no Command Log messages
    cy.get('img').each(($image: JQuery<HTMLImageElement>) => {
      // $image is a jQuery object with a single IMG element inside
      const { naturalWidth, src, alt } = $image[0]
      if (!alt) {
        throw new Error(`Image ${src} does not have alt property`)
      }
      if (!naturalWidth) {
        throw new Error(`
          Image "${alt}" did not load
          url: ${src}
        `)
      }
    })
    // log a message that all images have loaded successfully
    cy.log('**all images load 🏞️**')
  })
})
