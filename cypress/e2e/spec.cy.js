import 'cypress-real-events'

it('changes the background color to darker', () => {
  cy.visit('index.html')
  // get the current background color of the "main" element
  const rgb = /^rgb\((\d+)\, (\d+)\, (\d+)\)$/
  cy.get('main')
    .should('have.css', 'background-color')
    .then((c1) => {
      expect(c1, 'rgb color 1').to.match(rgb)
      const m1 = c1.match(rgb)
      const rgb1 = [Number(m1[1]), Number(m1[2]), Number(m1[3])]
      console.log(rgb1)
      // hover over the main element
      cy.get('main').realHover()
      // get the background color and confirm each RGB channel
      // is lower than the original value
      cy.get('main')
        .should('have.css', 'background-color')
        .then((c2) => {
          expect(c2, 'rgb color 2').to.match(rgb)
          const m2 = c2.match(rgb)
          const rgb2 = [Number(m2[1]), Number(m2[2]), Number(m2[3])]
          console.log(rgb2)
          expect(rgb2[0], 'red').to.be.lessThan(rgb1[0])
          expect(rgb2[1], 'green').to.be.lessThan(rgb1[1])
          expect(rgb2[2], 'blue').to.be.lessThan(rgb1[2])
        })
    })
})
