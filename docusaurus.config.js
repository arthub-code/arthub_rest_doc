const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

module.exports = {
  title: 'Arthub Microservices',
  tagline: 'Tenha acesso aos microserviços da melhor plataforma para o artista digital!',
  url: 'http://localhost', // URL base para desenvolvimento local
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo-arthub.png',
  organizationName: 'arthub', // Repositório ou organização GitHub
  projectName: 'arthub-microservices', // Nome do projeto

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // URL para edição no GitHub
          editUrl: 'https://github.com/arthub-microservices',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/arthub-microservices/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Arthub Microservices',
      logo: {
        alt: 'Arthub Logo',
        src: 'img/logo-arthub.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started',
          position: 'left',
          label: 'Documentação',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/arthub-code/arthub_rest',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started' },
            { label: 'API Endpoints', to: '/docs/api/useraccount' },
          ],
        },
        {
          title: 'Comunidade',
          items: [
            { label: 'GitHub', href: 'https://github.com/arthub-code/arthub_rest' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Arthub. Todos os direitos reservados.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};
