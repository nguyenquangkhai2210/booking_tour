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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import khainq.controller.ReadBodyRequest;
import khainq.modals.dto.ToursDTOWithList;
import khainq.modals.tbl_Category.Tbl_CategoryDTO;
import khainq.modals.tbl_Image.Tbl_ImageDAO;
import khainq.modals.tbl_Image.Tbl_ImageDTO;
import khainq.modals.tbl_Tours.Tbl_ToursDAO;
import khainq.modals.tbl_Tours.Tbl_ToursDTO;

/**
 *
 * @author khainguyenquang
 */
public class GetAllTourUser extends HttpServlet {

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
        response.setContentType("test/json;charset = UTF-8");
        PrintWriter pw = response.getWriter();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        ReadBodyRequest bodyRequest = new ReadBodyRequest();
        String jsonBody = bodyRequest.getJsonBody(request);

        Tbl_CategoryDTO categoryDTO = gson.fromJson(jsonBody, Tbl_CategoryDTO.class);
        try {
            Tbl_ToursDAO dao = new Tbl_ToursDAO();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            String dateString = format.format(new Date());

            List<Tbl_ToursDTO> listTour = dao.getListToursByCategory(categoryDTO.getId(), dateString, "activity");

            List<ToursDTOWithList> lists = new ArrayList<>();
            listTour.forEach(data -> getListImage(data, lists));

            String json = gson.toJson(lists);
            
            pw.append(json);

            response.setStatus(200);

        } catch (Exception e) {
            log("ERROR at GetAllTourUser controller: " + e.getMessage());
            response.setStatus(404);

        }
    }

    private void getListImage(Tbl_ToursDTO dto, List<ToursDTOWithList> lists) {
        try {
            Tbl_ImageDAO dao = new Tbl_ImageDAO();

            Tbl_ImageDTO image = dao.getOneImage(dto.getId());
            ToursDTOWithList tour = new ToursDTOWithList(image.getUrl(), dto);

            lists.add(tour);
        } catch (Exception e) {
            log("ERROR at GetAllTourUser controller: " + e.getMessage());
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
