/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_Tours;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import khainq.modals.dto.TourDetail;
import khainq.modals.dto.TourDetailDTO;
import khainq.utils.MyConnection;

/**
 *
 * @author khainguyenquang
 */
public class Tbl_ToursDAO implements Serializable {

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

    public List<Tbl_ToursDTO> getListToursByCategory(int category, String date, String status)
            throws ClassNotFoundException, SQLException {
        List<Tbl_ToursDTO> listTours = null;
        try {
            String sql = "Select Id, Name, StartDate, EndDate, MemberNumber, Description, Price, MaxMemberNumber "
                    + "From tblTours "
                    + "Where Status = ? and CategoryId = ? and StartDate between ? and ? ";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, status);
            stm.setInt(2, category);
            stm.setString(3, date);
            stm.setString(4, "3000-01-01");

            rs = stm.executeQuery();
            listTours = new ArrayList<>();

            while (rs.next()) {
                int id = rs.getInt("Id");
                String name = rs.getString("Name");
                String startDate = rs.getString("StartDate");
                String endDate = rs.getString("EndDate");
                int memberNumber = rs.getInt("MemberNumber");
                String description = rs.getString("Description");
                float price = rs.getFloat("Price");
                int maxMemberNumber = rs.getInt("MaxMemberNumber");

                System.out.println(name);

                Tbl_ToursDTO dto = new Tbl_ToursDTO(id, name, startDate,
                        endDate, memberNumber, description, price,
                        maxMemberNumber, category, status);

                listTours.add(dto);
            }
        } finally {
            closeConnection();
        }
        return listTours;
    }

    public List<Tbl_ToursDTO> getListToursAll(int category)
            throws ClassNotFoundException, SQLException {
        List<Tbl_ToursDTO> listTours = null;
        try {
            String sql = "Select Id, Name, StartDate, EndDate, MemberNumber, Description, Price, MaxMemberNumber, Status "
                    + "From tblTours "
                    + "Where CategoryId = ? ";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setInt(1, category);

            rs = stm.executeQuery();
            listTours = new ArrayList<>();

            while (rs.next()) {
                int id = rs.getInt("Id");
                String name = rs.getString("Name");
                String startDate = rs.getString("StartDate");
                String endDate = rs.getString("EndDate");
                int memberNumber = rs.getInt("MemberNumber");
                String description = rs.getString("Description");
                float price = rs.getFloat("Price");
                int maxMemberNumber = rs.getInt("MaxMemberNumber");
                String status = rs.getString("Status");

                System.out.println(name);

                Tbl_ToursDTO dto = new Tbl_ToursDTO(id, name, startDate,
                        endDate, memberNumber, description, price,
                        maxMemberNumber, category, status);

                listTours.add(dto);
            }
        } finally {
            closeConnection();
        }
        return listTours;
    }

    public Tbl_ToursDTO getTourDetail(int id)
            throws ClassNotFoundException, SQLException {
        Tbl_ToursDTO tours = null;
        try {
            String sql = "Select Name, StartDate, EndDate, MemberNumber, "
                    + "Description, Price, MaxMemberNumber, CategoryId, Status "
                    + "From tblTours "
                    + "Where Id = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setInt(1, id);
            rs = stm.executeQuery();

            while (rs.next()) {
                String name = rs.getString("Name");
                String startDate = rs.getString("StartDate");
                String endDate = rs.getString("EndDate");
                int memberNumber = rs.getInt("MemberNumber");
                String description = rs.getString("Description");
                float price = rs.getFloat("Price");
                int maxMemberNumber = rs.getInt("MaxMemberNumber");
                int categoryId = rs.getInt("CategoryId");
                String status = rs.getString("Status");

                tours = new Tbl_ToursDTO(id, name, startDate, endDate,
                        memberNumber, description, price,
                        maxMemberNumber, categoryId, status);
            }
        } finally {
            closeConnection();
        }
        return tours;
    }

    public boolean updateTours(TourDetail dto)
            throws ClassNotFoundException, SQLException {
        boolean check = false;
        try {
            String sql = "Update tblTours "
                    + "Set Name = ?, StartDate = ?, "
                    + "EndDate = ?, MemberNumber = ?, "
                    + "Description = ?, Price = ?, "
                    + "MaxMemberNumber = ?, CategoryId = ? "
                    + "Where Id = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, dto.getName());
            stm.setString(2, dto.getStartDate());
            stm.setString(3, dto.getEndDate());
            stm.setInt(4, dto.getMemberNumber());
            stm.setString(5, dto.getDescription());
            stm.setFloat(6, dto.getPrice());
            stm.setInt(7, dto.getMaxMemberNumber());
            stm.setInt(8, dto.getCategoryId());
            stm.setInt(9, dto.getId());

            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }
        return check;
    }

    public boolean updateToursMember(int id, int memberNumber)
            throws ClassNotFoundException, SQLException {
        
        boolean check = false;
        try {
            String sql = "Update tblTours "
                    + "Set MemberNumber = ? + MemberNumber "
                    + "Where Id = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setInt(1, memberNumber);
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

    public boolean insertTours(TourDetail dto)
            throws SQLException, ClassNotFoundException {
        boolean check = false;
        try {
            String sql = "Insert into "
                    + "tblTours (Name, StartDate, EndDate, MemberNumber, Description, Price, MaxMemberNumber, CategoryId, Status) "
                    + "Values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, dto.getName());
            stm.setString(2, dto.getStartDate());
            stm.setString(3, dto.getEndDate());
            stm.setInt(4, dto.getMemberNumber());
            stm.setString(5, dto.getDescription());
            stm.setFloat(6, dto.getPrice());
            stm.setInt(7, dto.getMaxMemberNumber());
            stm.setInt(8, dto.getCategoryId());
            stm.setString(9, "activity");

            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }

        return check;
    }

    public int getTourId(TourDetail dto)
            throws SQLException, ClassNotFoundException {
        int id = 0;
        try {
            String sql = "Select id From tblTours "
                    + "Where Name = ? and StartDate = ? and EndDate = ? and MemberNumber = ? and Description = ? and Price = ? and MaxMemberNumber = ? and CategoryId = ? and Status = ? ";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, dto.getName());
            stm.setString(2, dto.getStartDate());
            stm.setString(3, dto.getEndDate());
            stm.setInt(4, dto.getMemberNumber());
            stm.setString(5, dto.getDescription());
            stm.setFloat(6, dto.getPrice());
            stm.setInt(7, dto.getMaxMemberNumber());
            stm.setInt(8, dto.getCategoryId());
            stm.setString(9, "activity");

            rs = stm.executeQuery();
            if (rs.next()) {
                id = rs.getInt("Id");
            }
        } finally {
            closeConnection();
        }

        return id;
    }

    public boolean deleteTours(int id)
            throws SQLException, ClassNotFoundException {
        boolean check = false;
        try {
            String sql = "Update tblTours "
                    + "Set Status = ? "
                    + "Where id = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, "isDeleted");
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
