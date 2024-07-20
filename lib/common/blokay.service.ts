import { postRequest, postMultimedia, postFile } from "./_base";

export default function useApi(endpoint: string, session: any) {
  const blockGet = async function ({ blockId = null, blockKey = null }: any) {
    const data = {
      blockId,
      blockKey,
    };

    try {
      const result: any = await postRequest(
        endpoint + "brain/get",
        data,
        session.getJwtToken()
      );
      return result.data;
    } catch (error: any) {
      console.log(error);
      if (error?.error == "Unauthorized") {
        session.logout();
      }
    }
  };

  const blockExec = async function (form: any, jwtToken: string) {
    const data = {
      ...form,
    };

    try {
      const result: any = await postRequest(
        endpoint + "brain/exec",
        data,
        jwtToken || session.getJwtToken()
      );
      return result.data;
    } catch (error: any) {
      console.log(error);
      if (error?.error == "Unauthorized") {
        session.logout();
      }
    }
  };

  const blockExecExcel = async function (form: any, jwtToken: string) {
    const data = {
      ...form,
    };

    try {
      const result = await postFile(
        endpoint + "brain/exec",
        data,
        jwtToken || session.getJwtToken()
      );
      return result;
    } catch (error: any) {
      console.log(error);
      if (error?.error == "Unauthorized") {
        session.logout();
      }
    }
  };

  const createSession = async function (form: any) {
    const data = {
      ...form,
    };

    const result: any = await postRequest(
      endpoint + "brain/createSession",
      data,
      null
    );
    return result.data;
  };

  const sendFile = async function (path: string, formData: any) {
    formData.append("_token", session.getJwtToken());
    return await postMultimedia(endpoint + path, formData);
  };

  return { blockGet, blockExec, blockExecExcel, sendFile, createSession };
}
