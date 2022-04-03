import React, { useEffect, useState } from 'react';
import styles from './index.less';

type TreeDataItem = {
    name: string,
    children?: TreeData
}

type TreeData = (TreeDataItem)[];

const Tree = ({ treeData } : { treeData : TreeData }) => {
    const [showData, setShowData] = useState<Array<string>>([]);
    const [allData, setAllData] = useState<any>([]);
    const [position, setPosition] = useState<number>(0);
   

    const findFather = (name:string, arr:TreeData) : any => {
       for(let i=0;i<arr.length;i++) {
           if(arr[i].name === name) {
               return (arr[i].children || []);
           }else {
               if(arr[i].children && (arr[i].children || []).length !== 0) {
                const res = findFather(name, arr[i].children as TreeData);
                if(res && res.length !== 0) {
                    return res;
                }
               }
           }
       }
    }
    const onShowChange = (name:string) => {
       const arr = findFather(name, treeData);
        if((arr || []).length > 0) {
           const data = arr?.map((item:any) => {
                        return item.name
                   })
        if(position>=allData.length){
            const allDataNew = [...allData];
            allDataNew.push(data)
            setAllData(allDataNew);
         }
         const allDataNew = [...allData];
         allDataNew[position] = data;
         setAllData(allDataNew);
         setPosition(position+1);
        setShowData(data as string[]);
        }else {
            alert('没有更多的值了哦，亲！');
        }

    }

    const onClickList = (index:number) => {
        if(index+1 !== position) {
        setPosition(index+1);
        setShowData(allData[index]);
        }
    }

    useEffect(() => {
        const data = (treeData || []).map(item => {
            return item.name;
        })

        const allDataNew = [...allData];
        allDataNew.push(data);
        setAllData(allDataNew);
        setShowData(data);
        setPosition(1);
    },[])
  return (
      <div className={styles.wrapper}>
          <div className={styles.list}>
              {
                  allData.map((item,index) => {
                   return <p 
                        key={index}
                        className={styles.listItem} 
                        style={position === (index+1)? {color: '#2980b9'} : {} }
                        onClick={() => onClickList(index)} >
                            {`第${index+1}级>`}
                        </p>
                  })
              }
          </div>
    <div className={styles.mainDiv}>
        {
            showData.map((item, index) => {
                return (
                    <div key={index} className={styles.item} onClick={ () => onShowChange(item) }>
                        {item}
                    </div>
                )
            })
        }
    </div>
    </div>
  )
}

export default Tree