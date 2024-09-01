import { Col, Row } from 'antd';
import { Button, ComboBox, Input } from '../../components';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import CertificateOfInspectionTable from './Table/CertificateOfInspectionTable';
import axios from 'axios';
import { endpoints } from '../../services/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import Validation from '../../utils/Validation';
import { useEffect } from 'react';
import { handleLoading, handleMessageModal, handleDetail } from '../../state/action-creators';

const CertificateOfInspection = () => {
  const { role, GUid, theme } = useSelector((state => state))
  const dispatch = useDispatch()

  const [dataTable, setDataTable] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState([])
  const [errors, setErrors] = useState({})
  const [appHasMounted, setAppHaMounted] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 25,
    },
  });



  const handleSearching = (e) => {
    e.preventDefault();
    if (tableParams.pagination.current === 1) {
      getTable();
    } else {
      setTableParams({
        pagination: {
          current: 1,
          pageSize: 25,
        },
      });
    }
  }

  // -> get talble service
  const getTable = () => {
    const postData = {
      iciStatus: filters?.status || "",
      searchText: filters?.searchText || "",
      startIndex: tableParams?.pagination?.current - 1,
      pageSize: tableParams?.pagination?.pageSize,
      urlVCodeInt: role,
      ssdsshGUID: GUid
    }
    setLoading(true);
    axios({
      url: endpoints.RestAPIs.InspectionCartificatelC.getAllInspectionCertificateIC.url,
      method: endpoints.RestAPIs.InspectionCartificatelC.getAllInspectionCertificateIC.method,
      data: postData,
    })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          setDataTable(res?.data?.Result?.inspectionCertificateLst || [])
          setLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res?.data.Result?.totalCount || 0,
            },
          })
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch = (error) => {
        console.log(error);
      }
  };

  // -> validation inputs manage licenses
  const handleChangeInputs = (name, value, validationNameList, event) => {
    if (name === "DateF") {
      if (Validation.minimumDate(filters?.DateT, value) === true) {
        setErrors({
          ...errors,
          DateT: [],
        });
      } else {
        setErrors({
          ...errors,
          DateT: Validation.minimumDate(filters?.DateT, value),
        });
      }
    } else if (name === "DateT") {
      if (Validation.maximumDate(filters?.DateF, value) === true) {
        setErrors({
          ...errors,
          DateF: [],
        });
      } else {
        setErrors({
          ...errors,
          DateF: Validation.maximumDate(filters?.DateF, value),
        });
      }
    }

    const temp = [];
    validationNameList &&
      validationNameList.map((item) => {
        if (Validation[item[0]](value, item[1]) === true) {
        } else {
          temp.push(Validation[item[0]](value, item[1]));
        }
      });
    setErrors((prevstate) => {
      return {
        ...prevstate,
        [name]: [...temp],
      };
    });
    setFilters((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });
  };


  useEffect(() => {
    if (appHasMounted) {
      setDataTable([]);
      getTable();
    }
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

  useEffect(() => {
    setAppHaMounted(true);
    setDataTable([])
    getTable()
  }, [])

  return (
    <>
      <Row>
        <Col sm={24} md={12} xl={6} xxl={3} >
          <Link to={`/Users/AC/Commercial/CertificateOfInspectionNew`} >
            <Button>
              <i className="fa fa-plus-square" aria-hidden="true"></i>
              گواهی جدید </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} xl={8} xxl={8}>
          <ComboBox
            title="وضعیت"
            name="status"
            value={filters?.status}
            onChange={handleChangeInputs}
            // options={comboStatus}
            width="150px"
          />
        </Col>
        <Col sm={24} md={12} xl={8} xxl={8}>
          <Input
            name='searchText'
            onChange={handleChangeInputs}
            value={filters?.searchText}
            title="متن جستجو"
          />
        </Col>
        <Button name="getsssTable" onClick={handleSearching} loading={loading} >
          <i className="fa fa-search" aria-hidden="true"></i>
          جستجو
        </Button>
      </Row>
      <CertificateOfInspectionTable loading={loading} dataTable={dataTable} setDataSource={setDataTable} setTableParams={setTableParams}
        tableParams={tableParams} />
    </>
  )
}

export default CertificateOfInspection;
