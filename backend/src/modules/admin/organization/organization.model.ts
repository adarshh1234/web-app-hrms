import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganizationLocation {
  _id?: mongoose.Types.ObjectId | string;
  name: string;
  city: string;
  country: string;
  phone?: string;
  employees?: number;
}

export interface IOrganization extends Document {
  name: string;
  regNumber?: string;
  taxId?: string;
  phone?: string;
  fax?: string;
  email?: string;
  addressStreet1?: string;
  addressStreet2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  notes?: string;
  locations: IOrganizationLocation[];
  structureTree?: any;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<IOrganizationLocation>(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    phone: { type: String, default: '', trim: true },
    employees: { type: Number, default: 1 },
  },
  { _id: true }
);

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, default: 'HUREMASO', trim: true },
    regNumber: { type: String, default: 'TX-90823812C', trim: true },
    taxId: { type: String, default: 'TAX-884920', trim: true },
    phone: { type: String, default: '1-876-267-6999', trim: true },
    fax: { type: String, default: '1-876-267-7000', trim: true },
    email: { type: String, default: 'info@huremaso.org', trim: true },
    addressStreet1: { type: String, default: '324 Kochi Development Zone', trim: true },
    addressStreet2: { type: String, default: 'Suite 400', trim: true },
    city: { type: String, default: 'Kochi', trim: true },
    state: { type: String, default: 'Kerala', trim: true },
    zipCode: { type: String, default: '682030', trim: true },
    country: { type: String, default: 'India', trim: true },
    notes: { type: String, default: 'Primary corporate headquarters and offshore software engineering development center.', trim: true },
    locations: { type: [LocationSchema], default: [] },
    structureTree: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  }
);

export const OrganizationModel = mongoose.model<IOrganization>('Organization', OrganizationSchema);
