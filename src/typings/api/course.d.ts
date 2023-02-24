interface TypeItem {
    createBy: string;
    createTime: string;
    updateBy:string | null;
    updateTime: string |null;
    id: number;
    name: string;
    sort: number;
}

interface CourseListItem{
    createBy: string;
    createTime: string;
    updateBy:string | null;
    updateTime: string |null;
    remark: string | null;
    id: number;
    name: string;
    materialType: number;
    viewCoveUrl: string;
    viewUrl: string | null;
    delFlag: string;
    author: string | null;
    authorAvatar: string | null;
    viewCount: number;
    materialTypeLabel: string | null;
}