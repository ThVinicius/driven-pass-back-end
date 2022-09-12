import { wireless } from '@prisma/client'

export type IWireless = Omit<wireless, 'id' | 'createdAt'>
