describe('Contact Management', () => {
    const contact = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890'
    };
  
    beforeEach(() => {
      // Visita a aplicação antes de cada teste
      cy.visit('https://agenda-contatos-react.vercel.app/');
    });
  
    it('should add a new contact', () => {
      cy.get('button').contains('Adicionar Contato').click();
      cy.get('input[name="name"]').type(contact.name);
      cy.get('input[name="email"]').type(contact.email);
      cy.get('input[name="phone"]').type(contact.phone);
      cy.get('button').contains('Salvar').click();
      cy.contains(contact.name).should('exist');
      cy.contains(contact.email).should('exist');
      cy.contains(contact.phone).should('exist');
    });
  
    it('should edit an existing contact', () => {
      cy.contains(contact.name).parent().find('button').contains('Editar').click();
      const updatedName = 'Jane Doe';
      cy.get('input[name="name"]').clear().type(updatedName);
      cy.get('button').contains('Salvar').click();
      cy.contains(updatedName).should('exist');
      cy.contains(contact.name).should('not.exist');
    });
  
    it('should delete an existing contact', () => {
      cy.contains(contact.name).parent().find('button').contains('Excluir').click();
      cy.contains('Sim').click();
      cy.contains(contact.name).should('not.exist');
    });
  });
  