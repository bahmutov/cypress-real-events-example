import 'cypress-real-events/support'

it(
  'shows the copy code button',
  { browser: '!firefox', scrollBehavior: 'center' },
  () => {
    cy.visit('dmtrKovalenko/cypress-real-events')
    cy.contains('h2', 'Installation').scrollIntoView()

    cy.contains('.snippet-clipboard-content', 'npm install').within(() => {
      cy.get('[aria-label=Copy]').should('not.be.visible')
      cy.root().realHover()
      cy.get('[aria-label=Copy]').should('be.visible').realClick()
      // since the ".click" and ".realClick" do NOT retry
      // to wait for the attribute to change, we need to query the element
      // let's use the custom component <clipboard copy> element type
      cy.get('clipboard-copy').should('have.attr', 'aria-label', 'Copied!')
      // the "Copied" attribute reverts back
      cy.get('clipboard-copy').should('have.attr', 'aria-label', 'Copy')
    })
  },
)

it(
  'shows the copied tooltip',
  { browser: '!firefox', scrollBehavior: 'center' },
  () => {
    cy.visit('dmtrKovalenko/cypress-real-events')
    cy.contains('h2', 'Installation').scrollIntoView()

    cy.contains('.snippet-clipboard-content', 'npm install').within(() => {
      cy.get('[aria-label=Copy]').should('not.be.visible')
      cy.root().realHover()
      cy.get('[aria-label=Copy]').should('be.visible').realClick()
      // the SVG tooltip shows the text "Copied!"
      // using its ::after CSS content
      cy.get('.tooltipped').should('be.visible')
      // then the tooltip goes away from the DOM completely
      cy.get('.tooltipped').should('not.exist')
    })
  },
)

it(
  'shows the tooltip with the expected text',
  { browser: '!firefox', scrollBehavior: 'center' },
  () => {
    cy.visit('dmtrKovalenko/cypress-real-events')
    cy.contains('h2', 'Installation').scrollIntoView()

    cy.contains('.snippet-clipboard-content', 'npm install').within(() => {
      cy.get('[aria-label=Copy]')
        .should('not.be.visible')
        .should('have.attr', 'data-copy-feedback')
        .then((copyText) => {
          cy.root().realHover()
          cy.get('[aria-label=Copy]').should('be.visible').realClick()
          // the SVG tooltip shows the text "Copied!"
          // using its ::after CSS content
          cy.get('.tooltipped')
            .should('be.visible')
            .then(($el) => {
              const after = window.getComputedStyle($el[0], '::after')
              const afterContent = after.getPropertyValue('content')
              // the ::after content has double quotes
              expect(afterContent, 'tooltip text').to.equal(
                '"' + copyText + '"',
              )
            })
          // then the tooltip goes away from the DOM completely
          cy.get('.tooltipped').should('not.exist')
        })
    })
  },
)
