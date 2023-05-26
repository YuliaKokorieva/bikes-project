describe('Bike Rides App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Bike Rides App')
    cy.contains('Stations')
  })

  it('Rides tab can be clicked', () => {
    cy.get('#ridesTab').click()
    cy.contains('Laajalahden aukio')
  })

  it('In Stations Tab, info on single station can be rendered', () => {
    cy.get('#stationsTab').click()
    cy.contains('Kaivopuisto').click()
    cy.contains('Meritori 1')
  })
})