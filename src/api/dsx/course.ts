import http from "./http"

// 类别
export function getTypeList(){
    return http.get<{data: TypeItem[]}>("/mobile/materialCenter/typeList");
}

interface CourseListParams{
    id : number
}
// 课程列表
export function getCourseList(pageNum = 1, pageSize = 10, filter: CourseListParams){
    const {id} = filter
    return http.get<{data: CourseListParams[]}>("/mobile/materialCenter/centerList/"+ id, {pageNum, pageSize});
}