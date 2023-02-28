import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  LabelField: string
}

export type IMConfig = ImmutableObject<Config>
