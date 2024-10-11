import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Fácil de Utilizar',
    Svg: require('../../static/img/happy.svg').default,
    description: (
      <>
        Os microserviços do Arthub foram desenvolvidos pensando sempre em oferecer mais simplicidade para o frontoffice. Endpoints e payloads nada complicados. 
      </>
    ),
  },
  {
    title: 'Foco na Resiliência',
    Svg: require('../../static/img/strong.svg').default,
    description: (
      <>
        Nossos microserviços tem como foco principal a resiliência dos serviços, garantindo a flexibilidade e segurança em utiliza-los. 
      </>
    ),
  },
  {
    title: 'Feito com Java ☕',
    Svg: require('../../static/img/coffee.svg').default,
    description: (
      <>
        Nosso backoffice inteiro foi desenvolvido com a querida linguagem de programação Java! Utilizando o Spring Framework.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
