/**
 * Skenario pengujian E2E:
 *
 * - Login spec
 *   - harus menampilkan halaman login secara benar
 *   - harus menampilkan alert ketika email atau password salah
 *   - harus berhasil login dan menampilkan halaman beranda serta nama pengguna di navbar ketika kredensial valid
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('harus menampilkan halaman login secara benar', () => {
    // memverifikasi elemen form login
    cy.get('input#login-email').should('be.visible');
    cy.get('input#login-password').should('be.visible');
    cy.get('button[type="submit"]').contains(/masuk ke akun/i).should('be.visible');
  });

  it('harus menampilkan alert ketika email atau password salah', () => {
    // stub window.alert
    const stubAlert = cy.stub();
    cy.on('window:alert', stubAlert);

    // mengisi form dengan email dan password yang salah
    cy.get('input#login-email').type('email.salah@dicoding.com');
    cy.get('input#login-password').type('passwordsalah123');
    cy.get('button[type="submit"]').click();

    // memverifikasi alert terpanggil
    cy.wrap(stubAlert).should('be.called');
  });

  it('harus berhasil login dan menampilkan halaman beranda serta nama pengguna di navbar ketika kredensial valid', () => {
    // intercept API login dan profil
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'login success',
        data: {
          token: 'fake-access-token-12345',
        },
      },
    }).as('loginRequest');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'user profile retrieved',
        data: {
          user: {
            id: 'user-cypress-1',
            name: 'Cypress User',
            email: 'cypress@dicoding.com',
            avatar: 'https://ui-avatars.com/api/?name=Cypress+User',
          },
        },
      },
    }).as('getProfileRequest');

    // mengisi form login dengan kredensial valid
    cy.get('input#login-email').type('cypress@dicoding.com');
    cy.get('input#login-password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.wait('@getProfileRequest');

    // memverifikasi redirect ke beranda dan navbar menampilkan nama pengguna
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('.user-profile-badge').should('be.visible');
    cy.get('.user-profile-badge').should('contain', 'Cypress');
    cy.get('a').contains(/buat diskusi/i).should('be.visible');
  });
});
