package cat.tecnocampus.sample.service;

import cat.tecnocampus.sample.domain.Player;
import cat.tecnocampus.sample.repository.PlayerRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Player}.
 */
@Service
@Transactional
public class PlayerService {

    private final Logger log = LoggerFactory.getLogger(PlayerService.class);

    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    /**
     * Save a player.
     *
     * @param player the entity to save.
     * @return the persisted entity.
     */
    public Player save(Player player) {
        log.debug("Request to save Player : {}", player);
        return playerRepository.save(player);
    }

    /**
     * Update a player.
     *
     * @param player the entity to save.
     * @return the persisted entity.
     */
    public Player update(Player player) {
        log.debug("Request to update Player : {}", player);
        return playerRepository.save(player);
    }

    /**
     * Partially update a player.
     *
     * @param player the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Player> partialUpdate(Player player) {
        log.debug("Request to partially update Player : {}", player);

        return playerRepository
            .findById(player.getId())
            .map(existingPlayer -> {
                if (player.getName() != null) {
                    existingPlayer.setName(player.getName());
                }
                if (player.getBirthDate() != null) {
                    existingPlayer.setBirthDate(player.getBirthDate());
                }
                if (player.getHeight() != null) {
                    existingPlayer.setHeight(player.getHeight());
                }
                if (player.getWeight() != null) {
                    existingPlayer.setWeight(player.getWeight());
                }
                if (player.getBaskets() != null) {
                    existingPlayer.setBaskets(player.getBaskets());
                }
                if (player.getAssists() != null) {
                    existingPlayer.setAssists(player.getAssists());
                }

                return existingPlayer;
            })
            .map(playerRepository::save);
    }

    /**
     * Get all the players.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Player> findAll() {
        log.debug("Request to get all Players");
        return playerRepository.findAll();
    }

    /**
     * Get all the players with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Player> findAllWithEagerRelationships(Pageable pageable) {
        return playerRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one player by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Player> findOne(Long id) {
        log.debug("Request to get Player : {}", id);
        return playerRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the player by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Player : {}", id);
        playerRepository.deleteById(id);
    }
}
