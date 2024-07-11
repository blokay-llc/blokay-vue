import { postRequest, postMultimedia } from "./_base";

export default function useApi(endpoint, session) {
  const blockGet = async function ({ blockId = null, blockKey = null }) {
    const data = {
      blockId,
      blockKey,
    };

    try {
      const result = await postRequest(
        endpoint + "brain/get",
        data,
        session.getJwtToken()
      );
      return result.data;
    } catch (error) {
      console.log(error);
      if (error?.error == "Unauthorized") {
        session.logout();
      }
    }
  };

  const blockExec = async function (form, jwtToken) {
    const data = {
      ...form,
    };

    try {
      const result = await postRequest(
        endpoint + "brain/exec",
        data,
        jwtToken || session.getJwtToken()
      );
      return result.data;
    } catch (error) {
      console.log(error);
      if (error?.error == "Unauthorized") {
        session.logout();
      }
    }
  };

  const createSession = async function (form) {
    const data = {
      ...form,
    };

    const result = await postRequest(
      endpoint + "brain/createSession",
      data,
      null
    );
    return result.data;
  };

  const sendFile = async function (path, formData) {
    return await postMultimedia(endpoint + path, formData, {});
  };

  return { blockGet, blockExec, sendFile, createSession };
}
