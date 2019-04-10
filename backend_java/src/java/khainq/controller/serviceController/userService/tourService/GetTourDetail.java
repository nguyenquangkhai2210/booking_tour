/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.controller.serviceController.userService.tourService;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import khainq.controller.ReadBodyRequest;
import khainq.modals.dto.TourDetailDTO;
import khainq.modals.tbl_Image.Tbl_ImageDAO;
import khainq.modals.tbl_Image.Tbl_ImageDTO;
import khainq.modals.tbl_Tours.Tbl_ToursDAO;
import khainq.modals.tbl_Tours.Tbl_ToursDTO;

/**
 *
 * @author khainguyenquang
 */
public class GetTourDetail extends HttpServlet {

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("test/json; charset = UTF-8");
        PrintWriter pw = response.getWriter();
        
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        ReadBodyRequest bodyRequest = new ReadBodyRequest();
        String jsonBody = bodyRequest.getJsonBody(request);
        
        Tbl_ToursDTO dto = gson.fromJson(jsonBody, Tbl_ToursDTO.class);
        try {
            Tbl_ToursDAO toursDAO = new Tbl_ToursDAO();
            Tbl_ToursDTO toursDTO = toursDAO.getTourDetail(dto.getId());
            
            Tbl_ImageDAO imageDAO = new Tbl_ImageDAO();
            List<Tbl_ImageDTO> listImage = imageDAO.getListImage(dto.getId());
            
            TourDetailDTO tourDetailDTO = new TourDetailDTO(toursDTO, listImage);
            
            String json = gson.toJson(tourDetailDTO);
            
            pw.append(json);
            
            response.setStatus(200);
        } catch (Exception e) {
            log("ERROR at GetTourDetail controller: " + e.getMessage());
            response.setStatus(404);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
