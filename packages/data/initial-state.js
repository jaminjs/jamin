import React, { Component, PropTypes } from 'react';
import serialize from 'serialize-javascript';

const KEY = '__INITIAL_STATE';

export function getInitialState() {
  return window[KEY];
}

export function SetInitialState({ state }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window['${KEY}'] = ${serialize(state)}`
      }}
    />
  );
}

SetInitialState.propTypes = {
  state: PropTypes.object.isRequired,
};
