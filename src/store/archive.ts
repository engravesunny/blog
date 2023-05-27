import { defineStore } from 'pinia'

import { ArchiveSingle } from '../types'

interface ArchiveState {
    archiveInfo: ArchiveSingle[]
}

export const archive = defineStore('archive', {
    state: (): ArchiveState => ({
        archiveInfo: []
    }),
    getters: {
    },
    actions: {
        setState(info: ArchiveSingle[]) {
            this.archiveInfo = info
        }
    },
})