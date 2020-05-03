'use strict';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FallbackComponent from './FallbackComponent.js';

class ErrorBoundary extends React.Component {
    state = { hasError: false }
  
    static getDerivedStateFromError (error) {
      return { hasError: true }
    }
  
    componentDidCatch (error, info) {
      logErrorToService(error, info.componentStack)
    }
  
    render () {
      return this.state.hasError
        ? <FallbackComponent />
        : this.props.children
    }
  }
  
export default ErrorBoundary;