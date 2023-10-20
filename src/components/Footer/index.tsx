import React from 'react';
import GitImage from 'next/image'
import DiscordImage from 'next/image'

function Footer() {
  const footerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    minHeight: '100px', // Defina uma altura mínima desejada
    backgroundColor: '#2e2d2d',
    padding: '2px',
    color: 'white',
    textAlign: 'center',
  };

  const contactStyle: React.CSSProperties = {
    fontSize: '14px',
    marginTop: '10px',
  };

  const imageStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center', // Centralize as imagens horizontalmente
    gap: '10px',
    marginTop: '10px', // Ajuste a margem superior das imagens
    width: '80px',
    height: '80px',
  };

  return (
    <footer style={footerStyle}>
      <div>
        <p>
          All data displayed in the application were created by <b>RafCake</b> and <b>Grimoire</b>, and are original to their <b><a href="https://docs.google.com/spreadsheets/d/1Nle99PghJVQxCwg-auVl04BpCBZqepjS7ms9naG427A/" target="_blank">web spreadsheet</a></b>.
        </p>
        <p>This database is unofficial, and some data may not match what's on the Return to Morroc server.</p>
      </div>
      <div style={contactStyle}>
        Application developed by <b>@rayanmuryell</b> using NextJS / React. If you'd like to get in touch, you can find the ways below:
      </div>
      <div style={imageStyle}>
        <div className='contact'>
          <a href="https://discord.gg/returntomorroc" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DiscordImage src='/discord.png' alt="imageDiscord" width="1000" height="1000"/>
          </a>
        </div>
        <div className='contact'>
          <a href="https://github.com/rayanmuryell" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
          <GitImage src='/github.png' alt="imageDiscord" width="1000" height="1000"/>
          </a>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
