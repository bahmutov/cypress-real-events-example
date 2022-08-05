import 'cypress-real-events/support'

it('shows the copy code button', { scrollBehavior: 'center' }, () => {
  cy.visit('dmtrKovalenko/cypress-real-events')
  cy.contains('h2', 'Installation').scrollIntoView()

  cy.contains('.snippet-clipboard-content', 'npm install').within(() => {
    cy.get('[aria-label=Copy]').should('not.be.visible')
    cy.root().realHover()
    cy.get('[aria-label=Copy]').should('be.visible').click()
  })
})
