it('shows the copy code button', () => {
  cy.visit('dmtrKovalenko/cypress-real-events')
  cy.contains('h2', 'Installation').scrollIntoView()

  cy.contains('.snippet-clipboard-content', 'npm install').within(() => {
    cy.get('[aria-label=Copy]').should('not.be.visible')
  })
})
