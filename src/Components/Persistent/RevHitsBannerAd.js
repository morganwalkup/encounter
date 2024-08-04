import React from 'react';

export default class Test extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//p300789.clksite.com/adServe/banners?tid=300789_586177_0';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    this.instance.appendChild(script);
  }

  render() {
    return <div ref={el => (this.instance = el)} />;
  }
}