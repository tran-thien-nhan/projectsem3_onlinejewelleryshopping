import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useData } from "../../../../Context/DataContext";
import Swal from "sweetalert2";
import axios from "axios";

const AdminEditStone = () => {
  const navigate = useNavigate();
  const { stone_ID } = useParams();
  const { stoneQualities, stones, loading, error } = useData();

  const [stone, setStone] = useState({
    stone_ID: "",
    stoneQlty_ID: "",
    stone_Gm: 0,
    stone_Pcs: 0,
    stone_Crt: 0,
    stone_Rate: 0,
    //stone_Amt: 0,
    visible: true,
  });

  useEffect(() => {
    const fetchStone = async () => {
      try {
        const response = await await axios.get(
          `https://localhost:7241/api/StoneMst/getonestone/${stone_ID}`
        );
        const fetchedStone = response.data.data;
        setStone(fetchedStone);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchStone();
  }, [stone_ID]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "stone_Rate") {
      if (value < 1) {
        value *= 100;
      }
    }

    setStone((prevStone) => ({
      ...prevStone,
      [name]: value,
    }));
  }

  const handleStoneQualityChange = (e) => {
    const { value } = e.target;
    setStone((prevItem) => ({
      ...prevItem,
      stoneQlty_ID: value,
    }));
  };

  const handleSelectedOptionChange = (e) => {
    setStone({ ...stone, visible: e.target.value === "true" });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("stone_ID", stone.stone_ID);
    formData.append("stoneQlty_ID", stone.stoneQlty_ID);
    formData.append("stone_Gm", stone.stone_Gm);
    formData.append("stone_Pcs", stone.stone_Pcs);
    formData.append("stone_Crt", stone.stone_Crt);
    formData.append("stone_Rate", stone.stone_Rate * 100);
    //formData.append("stone_Amt", stone.stone_Amt);
    formData.append("visible", stone.visible);

    // Kiểm tra chỉ nhập chữ cái và số dương
    if (!/^[A-Za-z\s]+$/.test(stone.stone_Rate)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Stone Rate should only contain letters and spaces",
      });
      return;
    }

    // Kiểm tra chỉ được nhập số dương cho stone_Gm, stone_Pcs, stone_Crt và stone_Rate (không kiểm tra số âm và số 0)
    if (
      parseInt(stone.stone_Gm) <= 0 ||
      isNaN(parseInt(stone.stone_Gm)) ||
      parseInt(stone.stone_Pcs) <= 0 ||
      isNaN(parseInt(stone.stone_Pcs)) ||
      parseInt(stone.stone_Crt) <= 0 ||
      isNaN(parseInt(stone.stone_Crt)) ||
      parseInt(stone.stone_Rate) <= 0 ||
      isNaN(parseInt(stone.stone_Rate))
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Stone Weight, Total Stone Per Pieces, Carat Per Stone, and Stone Rate should be positive numbers",
      });
      return;
    }

    // if (
    //     stones.some(
    //         (s) =>
    //             s.stone_ID !== stone.stone_ID
    //     )
    // ) {
    //     Swal.fire({
    //         icon: "error",
    //         title: "Error",
    //         text: "That Stone already exists!",
    //     });
    //     return;
    // }

    axios
      .put(`https://localhost:7241/api/StoneMst`, formData)
      .then((res) => {
        if (res.data.status === 200) {
          setStone({
            stone_ID: "",
            stoneQlty_ID: "",
            stone_Gm: 0,
            stone_Pcs: 0,
            stone_Crt: 0,
            stone_Rate: 0,
            stone_Amt: 0,
            visible: true,
          });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Stone Updated successfully!",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/stones");
            window.location.reload();
          }, 1500);
        } else if (res.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.data.message,
          });
          setTimeout(() => {
            Swal.close();
            navigate("/stones");
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Stone Update Failed!",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/stones");
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Error updating stone:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error updating Stone!",
        });
        setTimeout(() => {
          Swal.close();
          navigate("/stones");
          window.location.reload();
        }, 1500);
      });
  }

  return (
    <div className="container">
      <h1>Update Stone</h1>
      <form
        onSubmit={handleSubmit}
        className="my-4"
        encType="multipart/form-data"
      >
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <label for="Stone" class="form-label">
            Stone ID
          </label>
          <input
            type="text"
            class="form-control"
            id="stone_ID"
            placeholder="Enter Stone ID"
            name="stone_ID"
            value={"stone_ID"}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Weight in Gm" className="form-label">
            Stone Weight in Gm
          </label>
          <input
            type="number"
            className="form-control"
            id="stone_Gm"
            placeholder="Enter Stone Weight in Gm"
            name="stone_Gm"
            value={stone && stone.stone_Gm}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Total Stone Per Pieces" className="form-label">
            Total Stone Per Pieces
          </label>
          <input
            type="number"
            className="form-control"
            id="stone_Pcs"
            placeholder="Enter Total Stone Per Pieces"
            name="stone_Pcs"
            value={stone && stone.stone_Pcs}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Carat Per Stone" className="form-label">
            Carat Per Stone
          </label>
          <input
            type="number"
            className="form-control"
            id="stone_Crt"
            placeholder="Enter Carat Per Stone"
            name="stone_Crt"
            value={stone && stone.stone_Crt}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Categories" className="form-label">
            Stone Rate:
          </label>
          <input
            type="number"
            className="form-control"
            id="stone_Rate"
            placeholder="Enter Stone Rate"
            name="stone_Rate"
            value={stone && stone.stone_Rate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Quality">Stone Quality:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleStoneQualityChange}
            value={stone && stone.stoneQlty_ID}
          >
            <option selected>Select Stone Quality</option>
            {stoneQualities.map((stoneQuality) => (
              <option value={stoneQuality.stoneQlty_ID}>
                {stoneQuality.stoneQlty}
              </option>
            ))}
          </select>
        </div>
        <div class="mb-3 mt-3">
          <label for="Stone Visible" class="form-label">
            Stone Hidden:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleSelectedOptionChange}
            value={stone && stone.visible}
          >
            <option selected>Visible</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Edit Stone
        </button>
      </form>
    </div>
  );
};

export default AdminEditStone;
