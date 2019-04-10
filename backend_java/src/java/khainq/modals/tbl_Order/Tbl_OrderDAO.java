/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_Order;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import khainq.utils.MyConnection;

/**
 *
 * @author khainguyenquang
 */
public class Tbl_OrderDAO implements Serializable {

    private Connection con;
    private PreparedStatement stm;
    private ResultSet rs;

    private void closeConnection()
            throws ClassNotFoundException, SQLException {
        if (rs != null) {
            rs.close();
        }
        if (stm != null) {
            stm.close();
        }
        if (con != null) {
            con.close();
        }
    }

    public List<Tbl_OrderDTO> getListOrderOfAdmin(String status, String time, String lastTime)
            throws ClassNotFoundException, SQLException {
        List<Tbl_OrderDTO> listOrder = null;
        try {
            String sql = "Select Id, CreatedTime, Total, UserId, LastUpdate, PriceRefund, IdConfig "
                    + "From tblOrder "
                    + "Where Status = ? and CreatedTime > ? and CreatedTime < ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, status);
            stm.setString(2, time);
            stm.setString(3, lastTime);
            
            rs = stm.executeQuery();
            listOrder = new ArrayList<>();

            while (rs.next()) {
                int id = rs.getInt("Id");
                String createdTime = rs.getString("CreatedTime");
                float total = rs.getInt("Total");
                String userId = rs.getString("UserId");
                String lastUpdate = rs.getString("LastUpdate");
                float priceRefund = rs.getFloat("PriceRefund");
                int idConfig = rs.getInt("IdConfig");
                Tbl_OrderDTO dto = new Tbl_OrderDTO(id, createdTime, total,
                        status, lastUpdate, priceRefund, idConfig, userId);
                listOrder.add(dto);
            }
        } finally {
            closeConnection();
        }

        return listOrder;
    }

    public List<Tbl_OrderDTO> getListOrder(String userId)
            throws ClassNotFoundException, SQLException {
        List<Tbl_OrderDTO> listOrder = null;
        try {
            String sql = "Select Id, CreatedTime, Total, Status, LastUpdate, PriceRefund, IdConfig "
                    + "From tblOrder "
                    + "Where UserId = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, userId);
            rs = stm.executeQuery();
            listOrder = new ArrayList<>();

            while (rs.next()) {
                int id = rs.getInt("Id");
                String createdTime = rs.getString("CreatedTime");
                float total = rs.getInt("Total");
                String status = rs.getString("Status");
                String lastUpdate = rs.getString("LastUpdate");
                float priceRefund = rs.getFloat("PriceRefund");
                int idConfig = rs.getInt("IdConfig");
                Tbl_OrderDTO dto = new Tbl_OrderDTO(id, createdTime, total,
                        status, lastUpdate, priceRefund, idConfig, userId);
                listOrder.add(dto);
            }
        } finally {
            closeConnection();
        }

        return listOrder;
    }

    public Tbl_OrderDTO getOneOrder(String userId, int id)
            throws ClassNotFoundException, SQLException {
        Tbl_OrderDTO order = null;
        try {
            String sql = "Select CreatedTime, Total, Status, LastUpdate, PriceRefund, IdConfig "
                    + "From tblOrder "
                    + "Where UserId = ? and Id = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, userId);
            stm.setInt(2, id);
            rs = stm.executeQuery();

            if (rs.next()) {
                String createdTime = rs.getString("CreatedTime");
                float total = rs.getInt("Total");
                String status = rs.getString("Status");
                String lastUpdate = rs.getString("LastUpdate");
                float priceRefund = rs.getFloat("PriceRefund");
                int idConfig = rs.getInt("IdConfig");
                order = new Tbl_OrderDTO(id, createdTime, total,
                        status, lastUpdate, priceRefund, idConfig, userId);
            }
        } finally {
            closeConnection();
        }

        return order;
    }

    public Tbl_OrderDTO getOneOrderOfAdmin(int id)
            throws ClassNotFoundException, SQLException {
        Tbl_OrderDTO order = null;
        try {
            String sql = "Select CreatedTime, Total, Status, UserId, LastUpdate, PriceRefund, IdConfig "
                    + "From tblOrder "
                    + "Where Id = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setInt(1, id);
            rs = stm.executeQuery();

            if (rs.next()) {
                String createdTime = rs.getString("CreatedTime");
                float total = rs.getInt("Total");
                String status = rs.getString("Status");
                String userId = rs.getString("UserId");
                String lastUpdate = rs.getString("LastUpdate");
                float priceRefund = rs.getFloat("PriceRefund");
                int idConfig = rs.getInt("IdConfig");
                order = new Tbl_OrderDTO(id, createdTime, total,
                        status, lastUpdate, priceRefund, idConfig, userId);
            }
        } finally {
            closeConnection();
        }

        return order;
    }

    public int getIdOrder(String date, String userId)
            throws SQLException, ClassNotFoundException {
        int id = 0;

        try {
            String sql = "Select Id From tblOrder "
                    + "Where CreatedTime = ? and UserId = ? ";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, date);
            stm.setString(2, userId);

            rs = stm.executeQuery();

            if (rs.next()) {
                id = rs.getInt("Id");
            }
        } finally {
            closeConnection();
        }

        return id;
    }

    public boolean insertOrder(String createdTime,
            float total,
            String status,
            String userId,
            String lastUpdate,
            float priceRefund)
            throws SQLException, ClassNotFoundException {
        boolean check = false;
        try {
            String sql = "Insert into "
                    + "tblOrder ( CreatedTime, Total, Status, UserId, LastUpdate, PriceRefund, IdConFig ) "
                    + "Values(?, ?, ?, ?, ?, ?, ?)";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, createdTime);
            stm.setFloat(2, total);
            stm.setString(3, status);
            stm.setString(4, userId);
            stm.setString(5, lastUpdate);
            stm.setFloat(6, priceRefund);
            stm.setString(7, null);

            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }

        return check;
    }

    public boolean refundOrder(int id)
            throws SQLException, ClassNotFoundException {
        boolean check = false;
        try {
            String sql = "Update tblOrder "
                    + "Set Status = ? "
                    + "Where id = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, "isRefund");
            stm.setInt(2, id);

            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }
        return check;
    }
}
