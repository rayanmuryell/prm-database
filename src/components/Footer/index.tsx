import React from 'react';
import GitImage from 'next/image';
import DiscordImage from 'next/image';

function Footer() {
  const footerStyle: React.CSSProperties = {
    marginTop: '40px',
  };


  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  };

  const contactStyle: React.CSSProperties = {
    fontSize: '14px',
  };

  const imageContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  };

  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <p>
          All data displayed in the application were created by <b>RafCake</b> and <b>Grimoire</b>, and are original to their <u><b><a href="https://docs.google.com/spreadsheets/d/1Nle99PghJVQxCwg-auVl04BpCBZqepjS7ms9naG427A/" target="_blank">web spreadsheet</a></b>.</u>
        </p>
        <p>This database is unofficial, and some data may not match what's on the Return to Morroc server.</p>
        <div style={contactStyle}>
          Application developed by <b>@rayanmuryell</b> using NextJS / React. If you'd like to get in touch, you can find the ways below:
        </div>
        <div style={imageContainerStyle}>
          <div className='contact'>
            <a href="https://discord.gg/returntomorroc" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
              <DiscordImage src='/discord.png' alt="imageDiscord" width="50" height="50"/>
            </a>
          </div>
          <div className='contact'>
            <a href="https://github.com/rayanmuryell" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
              <GitImage src='/github.png' alt="imageDiscord" width="50" height="50"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
