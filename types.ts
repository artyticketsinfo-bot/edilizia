
import React from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CompanyData {
  name: string;
  vat: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
}

export interface Client {
  id: string;
  name: string;
  vat?: string;
  address: string;
  phone: string;
  email: string;
  notes?: string;
}

export type QuoteStatus = 'BOZZA' | 'INVIATO' | 'ACCETTATO' | 'RESPINTO';

export interface Quote {
  id: string;
  number: string;
  clientId: string; // Collegamento all'anagrafica
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  description: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  date: string;
  status: QuoteStatus;
  notes?: string;
}

export interface Worker {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
  isEmployer: boolean;
}
