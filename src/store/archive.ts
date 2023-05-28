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
        checkYear(year: string): number | boolean {
            this.archiveInfo.map((item, index) => {
                if (item.year === year) {
                    return index
                }
            })
            return false
        },
        checkMonth(year: string, month: string) {
            const index = this.checkYear(year)
            if (index) {
                return this.archiveInfo[index as number].monthInfos.some(item => item.month === month)
            } else {
                return index
            }
        },
        addArchive(year: string, archiveItem: ArchiveMonthSingle) {
            this.archiveInfo.map(item => {
                const index = this.checkYear(year)
                if (index) {
                    this.archiveInfo[index as number].monthInfos.push(archiveItem)
                } else {
                    this.archiveInfo.push({
                        year,
                        monthInfos: [
                            archiveItem
                        ]
                    })
                }
            })
        },
        getArchivePosts(year: string, month: string): PostSingle[] {
            let temp: PostSingle[] = []
            this.archiveInfo.map(item => {
                if (item.year === year) {
                    item.monthInfos.map(item => {
                        if (item.month === month) {
                            temp = item.posts
                        }
                    })
                }
            })
            return temp
        }
    },
})