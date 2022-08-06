import 'cypress-real-events/support'

it(
  'writes the code snippet to the clipboard',
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
          cy.stub(clipboard, 'writeText').as('writeText').resolves()
        })
      cy.get('[aria-label=Copy]').should('be.visible').click()
      cy.get('clipboard-copy')
        .should('have.attr', 'value')
        .should('be.a', 'string')
        .and('be.not.empty')
        .then((code) => {
          cy.get('@writeText').should('have.been.calledOnceWithExactly', code)
        })
    })
  },
)
