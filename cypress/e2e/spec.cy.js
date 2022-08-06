import 'cypress-real-events/support'

it(
  'sends a custom event after clipboard copy',
  { browser: '!firefox', scrollBehavior: 'center' },
  () => {
    cy.visit('dmtrKovalenko/cypress-real-events')
    cy.contains('h2', 'Installation').scrollIntoView()

    cy.contains('.snippet-clipboard-content', 'npm install').within(() => {
      cy.get('[aria-label=Copy]').should('not.be.visible')
      cy.root().realHover()
      cy.window()
        .its('navigator.clipboard')
        .then((clipboard) => {
          cy.stub(clipboard, 'writeText').resolves()
        })
      // add your own event listener
      cy.document().invoke(
        'addEventListener',
        'clipboard-copy',
        // pass Cypress Sinon stub
        // and give it an alias
        cy.stub().as('copyEvent'),
      )
      cy.get('[aria-label=Copy]').should('be.visible').realClick()
      // get the stub using the alias
      // and confirm it was called once
      cy.get('@copyEvent').should('have.been.calledOnce')
    })
  },
)
