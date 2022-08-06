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
      cy.get('[aria-label=Copy]').should('be.visible').realClick()
      cy.get('clipboard-copy').should('have.attr', 'aria-label', 'Copied!')
      cy.get('clipboard-copy')
        .should('have.attr', 'value')
        .should('be.a', 'string')
        .and('be.not.empty')
        .then((code) => {
          cy.task('readClipboard').should('equal', code)
        })
    })
  },
)
