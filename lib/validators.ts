/**
 * Validation utilities for ChefShare
 * These validators ensure data integrity and security at the frontend level
 * In production, these validations should also be enforced on the backend
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates email format using RFC 5322 compliant regex
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email || email.trim() === '') {
    errors.push('Email is required');
    return { isValid: false, errors };
  }
  
  // RFC 5322 simplified email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates password strength
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates that two passwords match
 */
export function validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
  const errors: string[] = [];
  
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates required field
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  const errors: string[] = [];
  
  if (!value || value.trim() === '') {
    errors.push(`${fieldName} is required`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates minimum length
 */
export function validateMinLength(value: string, minLength: number, fieldName: string): ValidationResult {
  const errors: string[] = [];
  
  if (value.length < minLength) {
    errors.push(`${fieldName} must be at least ${minLength} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates maximum length
 */
export function validateMaxLength(value: string, maxLength: number, fieldName: string): ValidationResult {
  const errors: string[] = [];
  
  if (value.length > maxLength) {
    errors.push(`${fieldName} must not exceed ${maxLength} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
