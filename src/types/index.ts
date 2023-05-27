export interface PostSingle {
    category: string[]
    tag: string[]
    date: string
    name: string
}
export interface TagSingle {
    posts: PostSingle[]
    num: number
    name: string
}
export interface CategorySingle {
    posts: PostSingle[]
    name: string
}
export interface ArchiveSingle {
    posts: PostSingle[]
    year: string
}
