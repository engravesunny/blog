import { defineStore } from 'pinia'

import { ArchiveMonthSingle, ArchiveSingle, PostSingle } from '../types'

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
        },
        checkYear(year: string): boolean {
            let temp = false
            this.archiveInfo.map(item => {
                if (item.year === year) {
                    temp = true
                }
            })
            return temp
        },
        checkMonth(year: string, month: string) {
            const index = this.checkYear(year)
            let temp = false
            if (index) {
                this.archiveInfo.map(item => {
                    if (item.year === year) {
                        temp = item.monthInfos.some(item => item.month === month)
                    }
                })
            }
            return temp
        },
        addArchive(year: string, archiveItem: ArchiveMonthSingle) {
            const index = this.checkYear(year)
            if (index) {
                this.archiveInfo.map(item => {
                    if (item.year === year) {
                        item.monthInfos.push(archiveItem)
                    }
                })
            } else {
                this.archiveInfo.push({
                    year,
                    monthInfos: [
                        archiveItem
                    ]
                })
            }
        },
        getArchivePosts(year: string, month: string) {
            for (let item of this.archiveInfo) {
                if (item.year === year) {
                    for (let t of item.monthInfos) {
                        if (t.month === month) {

                            return t.posts
                        }
                    }
                }
            }
        }
    },
})